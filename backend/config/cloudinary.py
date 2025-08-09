# This file contains the cloudinary configuration
import cloudinary
import os
from dotenv import load_dotenv

# load the environment variables
load_dotenv()

# the function to return the cloudinary configuration
def configure_cloudinary():
    return cloudinary.config(
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key = os.getenv('CLOUDINARY_API_KEY'),
        api_secret = os.getenv('CLOUDINARY_API_SECRET')
    )