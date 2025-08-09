from jose import jwt
from dotenv import load_dotenv
import os

# load the env variables
load_dotenv()

# the secrets
ALGORITHM:str = os.getenv('ALGORITHM')
SECRET_KEY:str = os.getenv('SECRET_KEY')

# the function to parse the jwt and return the payload
def parse_token(token)->str:
    # try decoding the token
    payload = jwt.decode(token=token,key=SECRET_KEY,algorithms=[ALGORITHM])
    user_id = payload.get("user_id")
    #return the user id
    return user_id
       