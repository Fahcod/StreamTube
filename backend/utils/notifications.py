from config.db import users_collection
from bson import ObjectId
from models.notification_models import NotificationModel
from config.db import notifications_collection
from datetime import datetime

# the logic to notify all followers
def notify_followers(user_id:str,tag:str,message:str):
    try:
        user = users_collection.find_one({"_id":ObjectId(user_id)})
        followers:list = user["followers"]
        
        # save the notification
        for followerId in followers:
           newNotification:NotificationModel = {
               "_from":user_id,
               "_to":followerId,
               "tag":tag,
               "message":message,
               "seen":False,
               "created_at":datetime.now(),
               "updated_at":datetime.now()
               }
           
           notifications_collection.insert_one(dict(newNotification))

    except Exception as e:
        print(e)
        