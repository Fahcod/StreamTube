from fastapi import File,UploadFile,APIRouter,HTTPException
from fastapi.responses import JSONResponse
import shutil
from lib.version import VERSION
from random import random
from cloudinary import uploader
from config.cloudinary import configure_cloudinary

file_router = APIRouter(prefix=f"/api/{VERSION}/files")

# load the cloudinary configurations
configure_cloudinary()

# THE ENDPOINT TO UPLOAD IMAGE FILES TO CLOUDINARY
@file_router.post("/upload-image")
def upload_image(file:UploadFile = File(...)):
    try:
        result = uploader.upload(file.file)
        image_url = result["secure_url"]
        # prepare the response with the file url
        content = {
            "message":"Image uploaded successfully",
            "video_url":image_url
        }
        return JSONResponse(content=content,status_code=201)
        # the key "video_url" is being used up here because it is what is expected on the frontend
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,detail="Error uploading image")


# THE ENDPOINT TO UPLOAD VIDEO FILES TO CLOUDINARY
@file_router.post("/upload-video")
def upload_image(file:UploadFile = File(...)):
    try:
        result = uploader.upload(file.file,resource_type="video")
        video_url = result["secure_url"]
        # prepare the response with the file url
        content = {
            "message":"Image uploaded successfully",
            "video_url":video_url
        }
        return JSONResponse(content=content,status_code=201)
        # the key "video_url" is being used up here because it is what is expected on the frontend
        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,detail="Error uploading video")


# the endpoint for uploading files when in local development
@file_router.post("/upload")
def upload_file(file:UploadFile = File(...)):
    # generate a random signature
    random_signature = random()
    # the file location
    directory = f"static/{random_signature}_{file.filename}"
    # video url
    video_url = f"http://localhost:4700/static/{random_signature}_{file.filename}"
    # save the file
    with open (directory,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
        content = {"message":"File uploaded successfully","video_url":video_url}
        return JSONResponse(content=content,status_code=201)
