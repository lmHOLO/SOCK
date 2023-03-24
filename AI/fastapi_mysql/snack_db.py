# pip install pymysql
# pip install sqlalchemy
# pip install surprise
# uvicorn snack_db:app --reload

from typing import Optional, List
import pandas as pd
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine
from random import randint

class Item(BaseModel):
    member_id: int
    favor_list: list = []
    second_list: list = []
    
# USER = "ssafy"
# PASSWORD = "ssafy"
# HOST = "localhost"
# PORT = "3306"
# DATABASE = "sock"

def sigmoid_transform_purchase(x):
    # 입력값을 -5로 이동
    x = x - 5
    # 이동된 입력값을 10으로 스케일링
    x = 10 * x
    # 시그모이드 함수 적용(0.05를 곱해 기울기를 완만하게 변환)
    y = 1 / (1 + np.exp(-0.05*x))
    # 결과값을 0~5 사이의 값으로 변환
    y = 5 * y
    return y

def sigmoid_transform_search(x):
    # 입력값을 -20로 이동
    x = x - 20
    # 이동된 입력값을 10으로 스케일링
    x = 10 * x
    # 시그모이드 함수 적용(0.005를 곱해 기울기를 완만하게 변환)
    y = 1 / (1 + np.exp(-0.005*x))
    # 결과값을 0~5 사이의 값으로 변환
    y = 5 * y
    return y

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


@app.get("/recommend")
def recommend():
    import pymysql.cursors
    connection = pymysql.connect(host='localhost', port=3306, user='ssafy',
                            password='ssafy', db='sock',
                            charset='utf8', autocommit=True,
                            cursorclass=pymysql.cursors.DictCursor)
    
    cursor = connection.cursor()
    # purchase db에서 member_id, snack_id, count 가져오기
    # review db에서 writer_id, snack_id, star 가져오기
    # search db에서 member_id, snack_id, count 가져오가
    purchase_sql = "SELECT member_id, snack_id, count FROM sock.purchase;"
    cursor.execute(purchase_sql)
    purchase_cursor = cursor.fetchall()
    purchase_df = pd.DataFrame(purchase_cursor)

    for index, row in purchase_df.iterrows():
        purchase_df.loc[index, 'count'] = round(sigmoid_transform_purchase(purchase_df.loc[index, 'count']), 2)


    search_sql = "SELECT member_id, snack_id, count FROM sock.search;"
    cursor.execute(search_sql)
    search_cursor = cursor.fetchall()
    search_df = pd.DataFrame(search_cursor)

    for index, row in search_df.iterrows():
        search_df.loc[index, 'count'] = round(sigmoid_transform_search(search_df.loc[index, 'count']), 2)


    review_sql = "SELECT writer_id, snack_id, star FROM sock.review;"
    cursor.execute(review_sql)
    review_cursor = cursor.fetchall()
    review_df = pd.DataFrame(review_cursor)

    # 유저-아이템 종합 평점 테이블
    member_snack_arr = [[0]*729 for _ in range(9)]

    # 이것을 나눌 분모 테이블
    demoni = [[0]*729 for _ in range(9)]

    # 검색에 관련된 평점
    for i in range(len(search_df)):
        member_snack_arr[search_df.loc[i, 'member_id']][search_df.loc[i, 'snack_id']] += search_df.loc[i, 'count']
        demoni[search_df.loc[i, 'member_id']][search_df.loc[i, 'snack_id']] += 1
    # print(member_snack_arr)
    
    
    # 구매에 관련된 평점
    for i in range(len(purchase_df)):
        member_snack_arr[purchase_df.loc[i, 'member_id']][purchase_df.loc[i, 'snack_id']] += purchase_df.loc[i, 'count']*2
        demoni[purchase_df.loc[i, 'member_id']][purchase_df.loc[i, 'snack_id']] += 2
    # print(member_snack_arr)

    # 리뷰에 관련된 평점
    for i in range(len(review_df)):
        member_snack_arr[review_df.loc[i, 'writer_id']][review_df.loc[i, 'snack_id']] += review_df.loc[i, 'star']*3
        demoni[review_df.loc[i, 'writer_id']][review_df.loc[i, 'snack_id']] += 3
    # print(member_snack_arr)
    # print(demoni)

    np_member_snack_arr= np.array(member_snack_arr)
    np_demoni= np.array(demoni)

    result = np.divide(np_member_snack_arr, np_demoni)
    result = np.nan_to_num(result, 0)

    non_zero_indices = np.nonzero(result)

    total_rating = pd.DataFrame({
        'member_id': non_zero_indices[0],
        'snack_id': non_zero_indices[1],
        'rating': np.around(result[non_zero_indices], decimals = 2)
    })

    # total_rating_json = total_rating.to_json('/total_rating_json.json', orient="records")
    total_rating_json = total_rating.to_json(orient="records")

    # purchase_json = purchase_df.to_json(orient="records")
    # search_json = search_df.to_json(orient="records")
    return total_rating_json
    
