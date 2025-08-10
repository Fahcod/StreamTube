from fastapi import APIRouter,status,Cookie
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from utils.token_parser import parse_token
from lib.version import VERSION
from models.user_models import LoginUserModel,SignupUserModel
from config.db import users_collection
from bson import ObjectId
from datetime import timedelta,datetime
from jose import jwt
from serializers.user_serializer import decode_user
from email_validator import validate_email,ValidatedEmail
import os
from dotenv import load_dotenv
from models.user_models import ProfileUpdateModel
import bcrypt
from serializers.user_serializer import decode_other_users

# load the environment variables
load_dotenv()

ALGORITHM = os.getenv('ALGORITHM')
SECRET_KEY = os.getenv('SECRET_KEY')

# create the router
user_router = APIRouter(prefix=f"/api/{VERSION}/user")

# the function to hash the user password
def hash_user_password(password:str):
    # generate the salt
    salt = bcrypt.gensalt(rounds=10)
    hashed_pwd = bcrypt.hashpw(password=password.encode('utf-8'),salt=salt)
    # return the hashed password
    return hashed_pwd.decode('utf-8')

# function to generate the token
def generate_token(email:str,user_id:str,expires_delta:timedelta)->str:
    payload = {"sub":email,"user_id":user_id}
    expires = datetime.utcnow() + expires_delta
    payload.update({"exp":expires})
    token = jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)
    return token

# THE USER SIGNUP ENDPOINT
@user_router.post("/signup")
def signup_user(data:SignupUserModel):
    form_data = dict(data)
    # get the email,username and password
    email = form_data["email"]
    password = form_data["password"]
    username = form_data["username"]
    # todo: add a function to validate the email
    # check if the email is valid
    isEmail = validate_email(email)
    if (not isEmail):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
              detail="Please enter a valid email")
    # check if the email and username are available
    user_check = users_collection.find_one({"$or":[{"email":email},{"username":username}]})
    if (user_check):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
              detail = "Either email or username is already taken"
             )
    # if the user is new,hash the password ans update the form_data
    hashed_password = hash_user_password(password)
    form_data["password"] = hashed_password
    # try saving the user
    try:
        user = users_collection.insert_one(form_data)
        # create the token
        token = generate_token(email=email,user_id=str(user.inserted_id),expires_delta=timedelta(days=30))
        # create the response content
        content = {"message":"Account created successfully","token":token}
        # the response
        response = JSONResponse(status_code=201,content=content)
        # set the response cookie
        response.set_cookie(key='auth',value=token,httponly=True,samesite='none',secure=True,max_age=1000 * 60 * 60 *24 * 30)
        # return the response
        return response

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail = "An error occured"
                )
    
# THE USER LOGIN ENDPOINT
@user_router.post("/login")
def login_user(data:LoginUserModel):
    form_data = dict(data)
    # get the email and password
    email = form_data["email"]
    password = form_data["password"]
    # check if the email is valid
    isEmail = validate_email(email)
    if (not isEmail):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
              detail="Please enter a valid email")
    # find the user
    user = users_collection.find_one({"email":email})
    if (not user):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
              detail="User does not exist"
            )
    # get the user password and id
    user_pwd:str = user["password"]
    _id:str = str(user["_id"])
    # check if the passwords are matching
    pass_compare = bcrypt.checkpw(password=password.encode('utf-8'),hashed_password=user_pwd.encode('utf-8'))
    if(not pass_compare):
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
              detail="You entered a wrong password"
              )
    
    # create the token
    token = generate_token(email=email,user_id=_id,expires_delta=timedelta(days=30))
    # create the response content
    content = {"message":"Logged in successfully","token":token}
    # the response
    response = JSONResponse(status_code=200,content=content)
    # set the response cookie
    response.set_cookie(key='auth',value=token,httponly=True,samesite='none',secure=True,max_age=1000 * 60 * 60 *24 * 30)
    # return the response
    return response


# USER FOLLOWING ENDPOINT
@user_router.put("/follow/{other_id}")
def follow_user(other_id:str,auth:str=Cookie()):
    # get the user id
    user_id = parse_token(auth)
     # check if the user is following his/her self
    if (user_id == other_id):
        raise HTTPException(status_code=400,detail="You can't follow yourself")
    # fetch the two users
    user = users_collection.find_one({"_id":ObjectId(user_id)})
    otherUser = users_collection.find_one({"_id":ObjectId(other_id)})
    # get the following and followers fields
    user_following = user["following"]
    other_user_followers = otherUser["followers"]
    # check if the user is already following this user
    if (user_id in other_user_followers or other_id in user_following):
        users_collection.update_one({"_id":ObjectId(user_id)},{"$pull":{"following":other_id}})
        users_collection.update_one({"_id":ObjectId(other_id)},{"$pull":{"followers":user_id}})
        # return the response
        content = {"message":"User unfollowed successfully"}
        return JSONResponse(content=content,status_code=200)
    # if not,follow the user
    try:
        users_collection.update_one({"_id":ObjectId(user_id)},{"$push":{"following":other_id}})
        users_collection.update_one({"_id":ObjectId(other_id)},{"$push":{"followers":user_id}})
        # return the response
        content = {"message":"User followed successfully"}
        return JSONResponse(content=content,status_code=200)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )

# FETCH THE USER DATA
@user_router.get("/get-user")
def fetch_user(auth:str=Cookie()):
    try:
        # parse the token and get the user email
        user_id = parse_token(auth)
        # fetch the user 
        user = users_collection.find_one({"_id":ObjectId(user_id)})
        # decode the user
        user_data = decode_user(user)
        # return the response
        content = {"data":user_data}
        return JSONResponse(content=content,status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )

# FETCH ALL THE USERS
@user_router.get("/get-all-users")
def fetch_users():
    try:
        # fetch the users
        users = users_collection.find()
        # decode the users
        users_data = decode_other_users(users)
        # return the response
        content = {"data":users_data}
        return JSONResponse(content=content,status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )

# ADD WATCH HISTORY
@user_router.put("/add-watched/{post_id}")
def add_to_watched(post_id:str,auth:str=Cookie()):
   try:
        # get the user id
        user_id = parse_token(auth)
        # fetch the user
        user = users_collection.find_one({"_id":ObjectId(user_id)})
        # get the user's watched history
        watch_history = user["watch_history"]
        # check if the user already watched the video
        if(post_id in watch_history):
            content = {"message":"video already watched successfully"}
            return JSONResponse(content=content,status_code=200)
        # else, add the video to the watch history
        users_collection.update_one({"_id":ObjectId(user_id)},{"$push":{"watch_history":post_id}})
        # return the response
        content = {"message":"saved successfully"}
        return JSONResponse(content=content,status_code=200)

   except Exception as e:
         print(e)
         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )
   
# DELETE WATCH HISTORY
@user_router.put("/delete-history/{post_id}")
def delete_history(post_id:str,auth:str=Cookie()):
   try:
        # get the user id
        user_id = parse_token(auth)
        # remove the post id
        users_collection.update_one({"_id":ObjectId(user_id)},{"$pull":{"watch_history":post_id}})
        # return the response
        content = {"message":"History deleted successfully"}
        return JSONResponse(content=content,status_code=200)

   except Exception  as e:
         print(e)
         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )

# THE USER PROFILE UPDATE ENDPOINT
@user_router.put("/update-profile")
def update_user_profile(data:ProfileUpdateModel,auth:str=Cookie()):
    try:
        form_data = dict(data)
        # get the user id
        user_id = parse_token(auth)
        # get the fields
        newProfilePic = form_data["profile_pic"]
        newUsername = form_data["username"]
        newProfileBio = form_data["profile_bio"]
        # update the user
        users_collection.update_one({"_id":ObjectId(user_id)},{"$set":{
            "profile_pic":newProfilePic,
            "username":newUsername,
            "profile_bio":newProfileBio
        }})
        # return the response
        content = {"message":"Profile information updated successfully"}
        return JSONResponse(content=content,status_code=status.HTTP_202_ACCEPTED)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="Internal server error"
              )