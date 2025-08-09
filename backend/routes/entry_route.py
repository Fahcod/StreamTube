from fastapi import APIRouter


# the default entry route
entry_router = APIRouter()

@entry_router.get("/")
def entry_func():
    return {"status":"200","message":"The server is running"}