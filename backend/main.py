from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todos

app = FastAPI()

origins = [
    "*"
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(todos.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API!"}