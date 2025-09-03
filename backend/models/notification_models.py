from pydantic import BaseModel
from datetime import datetime

# the notification model
class NotificationModel(BaseModel):
    _from:str
    _to:str
    tag:str
    message:str
    seen:bool = False
    created_at:datetime = datetime.now()
    updated_at:datetime = datetime.now()