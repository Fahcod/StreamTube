from fastapi import FastAPI
import uvicorn
from lib.version import VERSION
from routes.entry_route import entry_router
from routes.user_route import user_router
from routes.file_route import file_router
from routes.post_route import post_router
from routes.comment_route import comment_router
from middleware.middleware import register_middleware
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(version=VERSION,description="The API for video streaming app")

# mount the static files folder
app.mount("/static",StaticFiles(directory="static"),"static")

# register the app middleware
register_middleware(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_credentials = True,
    allow_methods = ["GET","POST","PUT","DELETE"],
    allow_headers = ["*"]
)

# include all the routers
app.include_router(entry_router)
app.include_router(user_router)
app.include_router(file_router)
app.include_router(post_router)
app.include_router(comment_router)

if __name__ == "__main__":
    app.debug = True
    uvicorn.run(app=app,host='0.0.0.0',port=4700)