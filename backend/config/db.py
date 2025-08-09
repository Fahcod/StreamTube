from pymongo import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

# load the environment variables

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')

client = MongoClient(MONGO_URI,server_api=ServerApi("1"))

# get the database
db = client.NowStream

# create the collections
users_collection = db["users"]
posts_collection = db["posts"]
comments_collection = db["comments"]

# try connecting to the database
try:
    
    client.admin.command("ping")
    print("DB connected successfully")

except Exception as e:
    print(e)