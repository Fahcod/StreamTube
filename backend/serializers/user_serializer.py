
# the function to decode the user
def decode_user(data)->dict:
    return {
     "_id": str(data["_id"]),
    "fullname": data["fullname"],
    "username": data["username"],
    "email": data["email"],
    "profile_pic": data["profile_pic"],
    "password": data["password"],
    "followers": data["followers"],
    "following": data["following"],
    "search_history": data["search_history"],
    "profile_bio":data["profile_bio"],
    "saved_videos": data["saved_videos"],
    "watch_history": data["watch_history"],
    "settings": data["settings"]
    }

# funtion to decode many users
def decode_users(data)->list:
    return [decode_user(user) for user in data]

# decode other user
def decode_other_user(data)->dict:
    return {
     "_id": str(data["_id"]),
    "fullname": data["fullname"],
    "username": data["username"],
    "email": data["email"],
    "profile_pic": data["profile_pic"],
    "followers": data["followers"],
    "following": data["following"]
    }

# decode the other users
def decode_other_users(data)->list:
    return [decode_other_user(user) for user in data]