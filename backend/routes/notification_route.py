from fastapi import APIRouter,Cookie,HTTPException,status
from config.db import notifications_collection
from bson import ObjectId
from fastapi.responses import JSONResponse
from lib.version import VERSION
from utils.token_parser import parse_token
from serializers.notification_serializer import decode_notifications

# the notifications router
notification_router = APIRouter(prefix=f"/api/{VERSION}/notifications")

# FETCH THE USER NOTIFICATIONS
@notification_router.get('/fetch')
def get_user_notifications(auth:str=Cookie()):
    try:
        # get the user id
        user_id = parse_token(auth)

        result = notifications_collection.find({"_to":ObjectId(user_id)})
        data:list = decode_notifications(result)
        # return the response
        content = {"data":data}
        return JSONResponse(status_code=200,content=content)
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
            )