from fastapi import APIRouter,status,Request,Cookie
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from utils.token_parser import parse_token
from lib.version import VERSION
from config.db import users_collection
from models.post_models import VideoPostModel
from config.db import posts_collection
from serializers.post_serializer import decode_video_posts
from bson import ObjectId
from utils.notifications import notify_followers

# the post router
post_router = APIRouter(prefix=f"/api/{VERSION}/posts")

# THE ENDPOINT TO CREATE VIDEO POST
@post_router.post('/create')
def create_video_post(data:VideoPostModel):
    form_data = dict(data)
    # get the id
    creator_id = form_data["creator"]
    # update the data
    form_data["creator"] = ObjectId(creator_id)
    # try saving the post
    try:
        posts_collection.insert_one(form_data)
        # NOTIFY ALL THE FOLLOWERS
        notify_followers(
            user_id=creator_id,
            tag="New post",
            message="created a new post"
            )

        # return the response
        content = {"message":"Post created successfully"}
        return JSONResponse(content=content,status_code=201)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )

# THE ENDPOINT TO GET POSTS
@post_router.get("/get")
def fetch_posts():
    try:
        # the aggregation pipeline
        pipeline = [
            
            {
                "$lookup":{
                    "from":"users",
                    "localField":"creator",
                    "foreignField":"_id",
                    "as":"owner"
                },
            },
                {
                    "$unwind":"$owner"
                },
           {
               "$lookup":{
                   "from":"comments",
                   "localField":"comments",
                   "foreignField":"_id",
                   "as":"comments"
               }
           }

        ]
        # fetch the data
        result = posts_collection.aggregate(pipeline=pipeline)

        data = decode_video_posts(result)

        content = {"data":data}
        return JSONResponse(content=content,status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )

# THE POST UPDATE ENDPOINT
@post_router.put("/update/{post_id}")
def update_post(post_id:str):
    pass
    
# THE POST DELETION ENDPOINT
@post_router.delete("/delete/{post_id}")
def delete_post(post_id:str,request:Request):
    # get the user headers
    headers = request.headers
    # get the user id
    user_id:str = headers["user_id"]
    # first find the post
    post = posts_collection.find_one({"_id":post_id})
    # check if the user owns the post
    if post["creator"] != user_id:
        raise HTTPException(status_code=401,detail="This post is not yours")
    # if not delete the post
    posts_collection.delete_one({"_id":post_id})
    content = {"message":"Post deleted successfully"}
    return JSONResponse(content=content,status_code=200)


# THE ENDPOINT TO LIKE A POST
@post_router.put("/like/{post_id}")
def like_post(post_id:str,auth:str=Cookie()):
    # get the user id
    user_id = parse_token(auth)
    # fint the post
    try:
        post = posts_collection.find_one({"_id":ObjectId(post_id)})
        likes:list = post["likes"]
        # check if the user already liked the post
        if (user_id in likes):
            posts_collection.update_one({"_id":ObjectId(post_id)},{"$pull":{"likes":user_id}})
        # if not, add the user's like
        else:
           posts_collection.update_one({"_id":ObjectId(post_id)},{"$push":{"likes":user_id}})

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )

# THE ENDPOINT TO DISLIKE A POST
@post_router.put("/dislike/{post_id}")
def like_post(post_id:str,auth:str=Cookie()):
    # get the user id
    user_id = parse_token(auth)
    # fint the post
    try:
        post = posts_collection.find_one({"_id":ObjectId(post_id)})
        dislikes:list = post["dislikes"]
        # check if the user already liked the post
        if (user_id in dislikes):
            posts_collection.update_one({"_id":ObjectId(post_id)},{"$pull":{"dislikes":user_id}})
        # if not, add the user's like
        else:
           posts_collection.update_one({"_id":ObjectId(post_id)},{"$push":{"dislikes":user_id}})

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )

# SAVE A VIDEO
@post_router.put("/save/{post_id}")
def save_video(post_id:str,auth:str=Cookie()):
   try:
        #get the user id
        user_id = parse_token(auth)
        # fetch the user
        user = users_collection.find_one({"_id":ObjectId(user_id)})
        # get the user's saved videos
        saved_videos = user["saved_videos"]
        # check if the user already saved this video
        if (post_id in saved_videos):
            content = {"message":"Video already saved"}
            return JSONResponse(content=content,status_code=200)
        # if not,save the video
        users_collection.update_one({"_id":ObjectId(user_id)},{"$push":{"saved_videos":post_id}})
        content = {"message":"Video saved successfully"}
        return JSONResponse(content=content,status_code=status.HTTP_200_OK)

   except Exception as e:
         print(e)
         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )


# THE ENDPOINT TO ADD VIEWS A POST
@post_router.put("/view/{post_id}")
def like_post(post_id:str,auth:str=Cookie()):
    # get the user id
    user_id = parse_token(auth)
    # fint the post
    try:
        post = posts_collection.find_one({"_id":ObjectId(post_id)})
        views:list = post["views"]
        # check if the user already viewwed the post
        if (user_id in views):
            content={"message":"Already viewed this post"}
            return JSONResponse(content=content,status_code=200)
        # if not, add the user's like
        else:
           posts_collection.update_one({"_id":ObjectId(post_id)},{"$push":{"views":user_id}})

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )