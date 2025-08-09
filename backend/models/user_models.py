from pydantic import BaseModel
from datetime import datetime


# the user Signup model
class SignupUserModel(BaseModel):
    fullname:str
    username:str
    email:str
    profile_pic:str = "https://res.cloudinary.com/dtuatqheg/image/upload/v1736867796/oofp1azpdbc1ybvd35el.png"
    password:str
    followers:list = []
    following:list = []
    search_history:list = []
    saved_videos:list = []
    watch_history:list = []
    profile_bio:str="Iam a very proud user of StreamTube and I enjoy streaming educative and quality content!"
    settings:dict = {
        "theme":"Light",
    }
    created_at:datetime = datetime.now()
    updated_at:datetime = datetime.now()


# the user login
class LoginUserModel(BaseModel):
    email:str
    password:str

# the user profile update model
class ProfileUpdateModel(BaseModel):
    username:str
    profile_pic:str
    profile_bio:str