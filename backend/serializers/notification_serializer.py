
# decode a notification
def decode_notification(data)->dict:
    return {
        "_id":str(data["_id"]),
        "from":data["_from"],
        "to":data["_to"],
        "tag":data["tag"],
        "message":data["message"],
        "seen":data["seen"],
        "created_at":str(data["created_at"]),
        "updated_at":str(data["updated_at"])
    }


# decode notifications
def decode_notifications(data):
    return [decode_notification(notification) for notification in data]