# pip install pymysql
# pip install sqlalchemy
# pip install surprise
# uvicorn snack_db:app --reload

from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    member_id: int
    favor_list: list = []
    second_list: list = []
    

app = FastAPI()

# @app.post("/data/{member_id}")
# def send_data(member_id: int, list: Item):
@app.get("/data")
def send_data():
    import pymysql.cursors
    # from surprise import SVD
    # from surprise import Dataset 
    # from surprise import accuracy 
    # from surprise.model_selection import train_test_split
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import pandas as pd
    import numpy as np
    connection = pymysql.connect(host='localhost', port=3306, user='ssafy',
                                password='ssafy', db='sock',
                                charset='utf8', autocommit=True,
                                cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()
    snack_db = pd.read_json('snack_test.json')
    df = snack_db[['이름', '맛', '종류']]
    df['특성'] = df['맛'] + " " + df['종류']
    df = df[['이름', '특성']]

    tfidf = TfidfVectorizer()

    tfidf_matrix_voca = tfidf.fit(df['특성']).vocabulary_
    total_feature = sorted(tfidf_matrix_voca.items())
    feature_list = []
    for i in range(len(total_feature)):
        feature_list.append(total_feature[i][0])
    tfidf_matrix = tfidf.fit_transform(df['특성']).toarray()

    prefer_dataset = [0]*len(tfidf_matrix)
    favor_list = [0, 1, 678, 679, 680]
    second_list = [726, 727, 728]
    for i in range(len(favor_list)):
        prefer_dataset[favor_list[i]] = 4

    for i in range(len(second_list)):
        prefer_dataset[second_list[i]] = 2
    prefer_dataset = np.array([prefer_dataset])
    user_pref = pd.DataFrame(np.dot(prefer_dataset, tfidf_matrix), columns=feature_list)
    result = pd.DataFrame(cosine_similarity(user_pref, tfidf_matrix), columns=df['이름'])
    result = result.to_json(force_ascii=False, orient = "split")
    # snack_sql = "SELECT name, type_id FROM sock.snack;"
    # cursor.execute(snack_sql)
    # result1 = cursor.fetchall()
    # df = pd.DataFrame(result1)

    # flavor_sql = "SELECT snack_id, group_concat(flavor_id) from snack_flavor group by snack_id"
    # cursor.execute(flavor_sql)
    # result2 = cursor.fetchall()
    # df2 = pd.DataFrame(result2)
    # new_df = pd.concat((df, df2), axis = 1)


    
    
    # result4 = result3.to_json(force_ascii=False, orient='values')
    # result4 = df2.to_json(force_ascii=False, orient="columns")
    # # result4 = df.to_csv('snack_db3.csv', index=False, encoding="utf-8-sig")
    # # print(result4)
    return result


