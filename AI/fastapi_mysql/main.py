# 가상환경에서 pip install fastapi
# pip install unicorn or pip install hypercorn


# /docs
# /redoc
# /openapi.json

# uvicorn main:app --reload

from fastapi import FastAPI

app = FastAPI()

@app.get("/users")
def read_users():
    users = session.query(UserTable).all()
    return users



@app.get("/users/{user_id}")
def read_user(user_id: int):
    user = session.query(UserTable).filter(UserTable.id == user_id).first()
    return user



@app.post("/user")
def create_users(name: str, age: int):
    user =  UserTable()
    user.name = name
    user.age = age
    
    session.add(user)
    session.commit()
    return f"{name} created..."

@app.put("/users")
def update_users(users: List[User]):
    for i users:
    return read_users

@app.post("/user")
def create_users(name: str, age: int):
    return read_users

@app.get("/users")
def read_users():
    return read_users