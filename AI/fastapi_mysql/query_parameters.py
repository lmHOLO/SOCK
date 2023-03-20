# uvicorn main:app --reload

# query parameter: path parameter에 없는 파라미터를 의미
from fastapi import FastAPI
from typing import Optional
app = FastAPI()

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


# @app.get("/items/")
# async def read_item(skip: int = 0, limit: int = 10):
#     return fake_items_db[skip: skip+limit]

# url 값이 http://127.0.0.1:8000/items/?skip=0&limit=10 형식으로 자동 변환됨


# Optional 파라미터( 파이썬의 None 이용 )
@app.get("/items/{item_id}")
async def read_item(item_id = str, q: Optional[str] = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
# http://127.0.0.1:8000/items/snack?q=1