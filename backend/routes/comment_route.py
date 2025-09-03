from fastapi import APIRouter,status,Cookie
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from utils.token_parser import parse_token
from lib.version import VERSION
from config.db import comments_collection,posts_collection
from models.comment_models import CommentModel
from bson import ObjectId

# the comments router
comment_router = APIRouter(prefix=f"/api/{VERSION}/comments")

#THE ENDPOINT FOR COMMENTING
@comment_router.post("/comment/{post_id}")
def create_comment(data:CommentModel,post_id:str,auth:str=Cookie()):
    form_data = dict(data)
    # get the creators id
    creator_id = parse_token(auth)
    # set the 'creator' field
    form_data["creator"] = ObjectId(creator_id)
    form_data["post_id"] = ObjectId(post_id)
    # try saving the comment
    try:
        commentID = comments_collection.insert_one(form_data)
        # update the post
        posts_collection.update_one({"_id":ObjectId(post_id)},{"$push":{"comments":str(commentID.inserted_id)}})
        content = {"message":"Comment added successfully"}
        return JSONResponse(content=content,status_code=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )

# THE ENDPOINT TO DELETE A COMMENT
@comment_router.delete("/delete/{comment_id}")
def delete_comment(comment_id:str):
    try:
        # try to delete the comment
        comments_collection.delete_one({"_id":comment_id})
        content = {"message":"Comment deleted successfully"}
        return JSONResponse(content=content,status_code=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
              detail="An error occured"
            )