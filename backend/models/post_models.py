from pydantic import BaseModel
from datetime import datetime


# the model for the video post
class VideoPostModel(BaseModel):
    creator:str
    title:str
    video_url:str
    post_type:str
    likes:list = []
    category:str
    reposts:list = []
    views:list = []
    dislikes:list = []
    description:str
    comments:list = []
    created_at:datetime = datetime.now()
    updated_at:datetime = datetime.now()


