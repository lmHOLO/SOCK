# pip install pymysql
# pip install sqlalchemy
# uvicorn snack_db:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pymysql.cursors

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/data")
def send_data():
    connection = pymysql.connect(host='localhost', port=3306, user='ssafy',
                                password='ssafy', db='sock',
                                charset='utf8', autocommit=True,
                                cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()

    snack_sql = "SELECT snack_id, name, type_id FROM sock.snack;"
    cursor.execute(snack_sql)
    result1 = cursor.fetchall()
    # print(result[0])
    df = pd.DataFrame(result1)
    # print(df.head)

    flavor_sql = "SELECT snack_id, group_concat(flavor_id) from snack_flavor group by snack_id"
    cursor.execute(flavor_sql)
    result2 = cursor.fetchall()
    # print(result[0])
    df2 = pd.DataFrame(result2)
    # print(df2.head)
    result3 = pd.concat((df, df2), axis = 1)
    result4 = result3.to_json()
    # print(result4)
    return result4


