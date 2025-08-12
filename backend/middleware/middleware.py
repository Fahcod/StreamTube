from fastapi import FastAPI,HTTPException
from fastapi.requests import Request
from lib.version import VERSION
from jose import jwt
import os
from dotenv import load_dotenv

# load the env variables
load_dotenv()
ALGORITHM = os.getenv('ALGORITHM')
SECRET_KEY = os.getenv('SECRET_KEY')

def register_middleware(app:FastAPI):
    @app.middleware('http')
    async def check_auth(request:Request,call_next):
        # the paths that don't need authorization
        paths = [
            f"/api/{VERSION}/user/login",
            f"/api/{VERSION}/user/signup",
            "/"
            ]
        # get the cookies and headers
        cookies:dict = request.cookies
        # get the request path
        request_path = request.url.path
        # the request to be passed on to the next handler
        response = await call_next(request)
        
        if request_path not in paths:
            token:str = cookies.get("auth")
            # if the token does not exist,raise an error
            if (not token):
                raise HTTPException(status_code=401,detail="You are not logged in")
                # if token exists try to decode it and if successful, return the response
            else:
                #try to decode the token
                try:
                    payload = jwt.decode(token=token,key=SECRET_KEY,algorithms=[ALGORITHM])
                    user_id:str = payload.get("user_id")
                    if(user_id):
                        return response
                except Exception as e:
                    print(e)
                    raise HTTPException(status_code=401,detail="You are not logged in")
                    
        else:
            # if the user is just signing up or on the '/' path,just foward the request
            return response
            


        