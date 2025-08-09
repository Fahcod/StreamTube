
# the functions to decode the post
def decode_video_post(data)->dict:
    return {
        "_id":str(data["_id"]),
        "owner":{
            "_id":str(data["owner"]["_id"]),
            "username":data["owner"]["username"],
            "profile_pic":data["owner"]["profile_pic"],
            "followers":data["owner"]["followers"]
        },
        "title":data["title"],
        "video_url":data["video_url"],
        "post_type":data["post_type"],
        "likes":data["likes"],
        "category":data["category"],
        "views":data["views"],
        "dislikes":data["dislikes"],
        "description":data["description"],
        "reposts":data["reposts"],
        "created_at":str(data["created_at"]),
        "updated_at":str(data["updated_at"])
    }

# the functions to decode posts
def decode_video_posts(data)->list:
    return [decode_video_post(post) for post in data]
