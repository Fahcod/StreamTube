from pydantic import BaseModel
from datetime import datetime

# the comment model
class CommentModel(BaseModel):
    comment:str
    likes:list = []
    dislikes:list = []
    created_at:datetime = datetime.now()