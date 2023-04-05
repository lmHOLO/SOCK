# pip install pymysql
# pip install sqlalchemy
# pip install surprise
# uvicorn snack_db:app --reload --port 9000



import random
from typing import Optional, List
import pandas as pd
import numpy as np
import json
from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine
from random import randint
from surprise import SVD, Reader
from surprise.dataset import DatasetAutoFolds
from starlette.middleware.cors import CORSMiddleware
import os

class Item(BaseModel):
    id: int
    favor_list: list[int]

# USER = "ssafy"
# PASSWORD = "ssafy"
# HOST = "localhost"
# PORT = "3306"
# DATABASE = "sock"

def sigmoid_transform_purchase(x):
    # 입력값을 -5로 이동하기
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
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/fastapi/prefer")
def prefer_list(items: Item):
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    def make_preference_object():
        snack_db = pd.read_csv('./app/snack_db_final.csv', encoding='cp949')
        df = snack_db[['name', 'flavor', 'type_id']]
        df['특성'] = df['flavor'] + " " + df['type_id']
        df = df[['name', '특성']]
        tfidf = TfidfVectorizer()

        tfidf_matrix_voca = tfidf.fit(df['특성']).vocabulary_
        total_feature = sorted(tfidf_matrix_voca.items())
        feature_list = []
        for i in range(len(total_feature)):
            feature_list.append(total_feature[i][0])
        tfidf_matrix = tfidf.fit_transform(df['특성']).toarray()

        prefer_dataset = [0]*len(tfidf_matrix)
        favor_list = items.favor_list
        for i in range(len(favor_list)):
            prefer_dataset[favor_list[i]] = 4


        prefer_dataset = np.array([prefer_dataset])
        user_pref = pd.DataFrame(np.dot(prefer_dataset, tfidf_matrix), columns=feature_list)
        result = pd.DataFrame(cosine_similarity(user_pref, tfidf_matrix))
        result = result.values.flatten().tolist()
        result_obejct = {
            'member_id': items.id,
            'preference': result,
        }
        return result_obejct

    filename = './app/first_prefer.json'
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            data = json.load(f)
    else:
        data = []

    new_data = make_preference_object()
    data.append(new_data)

    with open(filename, 'w') as f:
        json.dump(data, f)

    return {"message": "json_update success"}

@app.get("/fastapi/recommend/cbf/{member_id}")
def recommend_by_cbf(member_id: int, grade: str):
    import pymysql.cursors
    connection = pymysql.connect(host='j8c103.p.ssafy.io', port=3306, user='root',
                        password='1234', db='sock',
                        charset='utf8', autocommit=True,
                        cursorclass=pymysql.cursors.DictCursor)
    cursor = connection.cursor()
    def weighted_random_indexes(numbers):
        total = sum(numbers)
        weights = [x / total for x in numbers]  # calculate proportional weights
        return random.choices(range(len(numbers)), weights=weights, k=5)  # extract 5 indexes using weights



    filename = './app/first_prefer.json'
    key = 'member_id'
    value = member_id

    # JSON 파일 읽어들이기
    with open(filename, 'r') as f:
        data = json.load(f)
        cbf_result = [item for item in data if item.get(key) == value][0]['preference']
        cbf_result = [round(x, 2) for x in cbf_result]
    if grade == 'FIRST_FLOOR':
        preference_factor = cbf_result
    else:
    # purchase db에서 member_id, snack_id, count 가져오기
    # review db에서 writer_id, snack_id, star 가져오기
    # search db에서 member_id, snack_id, count 가져오기
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

        total_user = "SELECT member_id FROM member ORDER BY member_id DESC LIMIT 1;"
        cursor.execute(total_user)
        user_cursor = cursor.fetchall()[0]['member_id']

        total_snack = "SELECT COUNT(*) FROM sock.snack;"
        cursor.execute(total_snack)
        snack_cursor = cursor.fetchall()[0]['COUNT(*)']


        # 유저-아이템 종합 평점 테이블
        member_snack_arr = [[0]*(snack_cursor+1) for _ in range(user_cursor+1)]

        # 이것을 나눌 분모 테이블
        demoni = [[6]*(snack_cursor+1) for _ in range(user_cursor+1)]


        # 검색에 관련된 평점
        for i in range(len(search_df)):
            member_snack_arr[search_df.loc[i, 'member_id']][search_df.loc[i, 'snack_id']] += search_df.loc[i, 'count']


        # 구매에 관련된 평점
        for i in range(len(purchase_df)):
            member_snack_arr[purchase_df.loc[i, 'member_id']][purchase_df.loc[i, 'snack_id']] += purchase_df.loc[i, 'count']*2


        # 리뷰에 관련된 평점
        for i in range(len(review_df)):
            member_snack_arr[review_df.loc[i, 'writer_id']][review_df.loc[i, 'snack_id']] += review_df.loc[i, 'star']*3


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

        total_rating.to_csv('./app/total_rating_noh.csv', index=False, header=False)


        # surprise 를 활용한 협업 필터링 구현 부분
        reader = Reader(line_format='user item rating', sep=',', rating_scale=(0, 5))
        data_folds = DatasetAutoFolds('./app/total_rating_noh.csv', reader=reader)
        trainset = data_folds.build_full_trainset()

        model = SVD(n_epochs=20, n_factors=50, random_state=0)
        model.fit(trainset)
        snack_db = pd.read_csv('./app/snack_db_final.csv', encoding='cp949')

        def recomm_snack_by_surprise(model, member_id, unseen_snacks, top_n=10):
            predictions = [model.predict(str(member_id), str(snack_id)) for snack_id in unseen_snacks]
            def sortkey_est(pred):
                return pred.est

            top_predictions = predictions[:top_n]


            top_snack_preds = []
            for pred in top_predictions:

                snack_id = int(pred.iid)
                snack_title = snack_db[snack_db["snack_id"] == snack_id]["이름"].tolist()
                snack_rating = pred.est
                top_snack_preds.append(round(snack_rating, 2))

            return top_snack_preds

        total_snack_id = [i for i in range(1, snack_cursor+1)]
        top_snack_preds = recomm_snack_by_surprise(model, member_id, total_snack_id, top_n=snack_cursor)
        preference_factor = []
        for i in range(len(top_snack_preds)):
            preference_factor.append(round(cbf_result[i] * top_snack_preds[i], 2))

    recommend_id = weighted_random_indexes(preference_factor)

    return recommend_id



@app.get("/fastapi/data")
def send_data():
    import pymysql.cursors

    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import pandas as pd
    import numpy as np
    connection = pymysql.connect(host='j8c103.p.ssafy.io', port=3306, user='root',
                                password='1234', db='sock',
                                charset='utf8', autocommit=True,
                                cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()
    print(os.getcwd())
    print(os.getcwd())
    print(os.getcwd())

    files = os.listdir('.')
    print(files)
    print(files)
    print(files)


    snack_db = pd.read_csv('./app/snack_db_final.csv', encoding='cp949')
    df = snack_db[['name', 'flavor', 'type_id']]
    df['특성'] = df['flavor'] + " " + df['type_id']
    df = df[['name', '특성']]

    tfidf = TfidfVectorizer()

    tfidf_matrix_voca = tfidf.fit(df['특성']).vocabulary_
    total_feature = sorted(tfidf_matrix_voca.items())
    feature_list = []
    for i in range(len(total_feature)):
        feature_list.append(total_feature[i][0])
    tfidf_matrix = tfidf.fit_transform(df['특성']).toarray()

    prefer_dataset = [0]*len(tfidf_matrix)
    favor_list = [0, 1, 678, 679, 680]
    for i in range(len(favor_list)):
        prefer_dataset[favor_list[i]] = 4

    user_pref = pd.DataFrame(np.dot(prefer_dataset, tfidf_matrix), columns=feature_list)
    result = pd.DataFrame(cosine_similarity(user_pref, tfidf_matrix), columns=df['이름'])
    result = result.to_json(force_ascii=False, orient = "split")

    return result
