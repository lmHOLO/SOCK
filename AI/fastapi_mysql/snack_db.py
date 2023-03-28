# pip install pymysql
# pip install sqlalchemy
# pip install surprise
# uvicorn snack_db:app --reload

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

    # 유저-아이템 종합 평점 테이블
    member_snack_arr = [[0]*729 for _ in range(9)]

    # 이것을 나눌 분모 테이블
    demoni = [[6]*729 for _ in range(9)]


    # 검색에 관련된 평점
    for i in range(len(search_df)):
        member_snack_arr[search_df.loc[i, 'member_id']][search_df.loc[i, 'snack_id']] += search_df.loc[i, 'count']
        # demoni[search_df.loc[i, 'member_id']][search_df.loc[i, 'snack_id']] += 1
    # print(member_snack_arr)
    
    # 검색에 참여한 유저의 숫자 구하기 (테스트 데이터 : user_num = 8)
    user_num = search_df.iloc[-1]['member_id'] 

    # 구매에 관련된 평점
    for i in range(len(purchase_df)):
        member_snack_arr[purchase_df.loc[i, 'member_id']][purchase_df.loc[i, 'snack_id']] += purchase_df.loc[i, 'count']*2
        # demoni[purchase_df.loc[i, 'member_id']][purchase_df.loc[i, 'snack_id']] += 2
    # print(member_snack_arr)

    # 리뷰에 관련된 평점
    for i in range(len(review_df)):
        member_snack_arr[review_df.loc[i, 'writer_id']][review_df.loc[i, 'snack_id']] += review_df.loc[i, 'star']*3
        # demoni[review_df.loc[i, 'writer_id']][review_df.loc[i, 'snack_id']] += 3
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
    
    total_rating.to_csv('total_rating_noh.csv', index=False, header=False)

    total_rating_json = total_rating.to_json(orient="records")

    # surprise 를 활용한 협업 필터링 구현 부분
    reader = Reader(line_format='user item rating', sep=',', rating_scale=(0, 5))
    data_folds = DatasetAutoFolds('total_rating_noh.csv', reader=reader)
    trainset = data_folds.build_full_trainset()

    model = SVD(n_epochs=20, n_factors=50, random_state=0)
    model.fit(trainset)
    snack_db = pd.read_csv('snack_db_test.csv', encoding='cp949')
    def get_unseen_surprise(ratings, snack_db, member_id):
    #입력값으로 들어온 userId에 해당하는 사용자가 평점을 매긴 모든 과자를 리스트로 생성
        seen_snacks = ratings[ratings['member_id']== member_id]['snack_id'].tolist()

        #모든 과자들의 snack_id를 리스트로 생성.
        total_snacks = snack_db['snack_id'].tolist()
        # print(total_snacks, 'total_snacks')
        # 모든 과자들의 snack_id 중 이미 평점을 매긴 과자의 snack_id를 제외하여 리스트로 생성
        unseen_snacks = [snack for snack in total_snacks if snack not in seen_snacks]
        # print(unseen_snacks)
        print('평점 매긴 과자수:', len(seen_snacks), '추천대상 과자수:', len(unseen_snacks), '전체 과자:', len(total_snacks))
        return unseen_snacks

    def recomm_snack_by_surprise(model, member_id, unseen_snacks, top_n=10):
        predictions = [model.predict(str(member_id), str(snack_id)) for snack_id in unseen_snacks]
        # print(predictions, 'test')
        def sortkey_est(pred):
            return pred.est

        predictions.sort(key=sortkey_est, reverse=True)
        top_predictions = predictions[:top_n]

        # top_snack_ids = [int(pred.iid) for pred in top_predictions]
        # top_snack_rating = [pred.est for pred in top_predictions]
        # top_snack_titles = snack_db[snack_db.snack_id.isin(top_snack_ids)]['이름']
        
        top_snack_preds = []
        for pred in top_predictions:
            
            snack_id = int(pred.iid)
            snack_title = snack_db[snack_db["snack_id"] == snack_id]["이름"].tolist()
            snack_rating = pred.est
            # print(f"{snack_id}, {snack_title}: {snack_rating:.2f}")
            top_snack_preds.append([f"{snack_id}, {snack_title}: {snack_rating:.2f}"])
        # top_snack_preds = [ (id, title, rating) for id, title, rating in zip(top_snack_ids, top_snack_titles, top_snack_rating)]
        return top_snack_preds
    
    top_snack_preds_list = []
    for i in range(1, int(user_num)+1):
        unseen_snacks = get_unseen_surprise(total_rating, snack_db, i+1)
        top_snack_preds = recomm_snack_by_surprise(model, i, unseen_snacks, top_n=10)
        top_snack_preds_list.append(top_snack_preds)
        
    # unseen_snacks = get_unseen_surprise(total_rating, snack_db, 1)
    # top_snack_preds = recomm_snack_by_surprise(model, 1, unseen_snacks, top_n=10)
        top_snack_preds_list_json = json.dumps(top_snack_preds_list, ensure_ascii=False)
    # top_snack_preds_json = top_snack_preds.to_json(force_ascii=False, orient = "split")
    
    return top_snack_preds_list_json
    # return total_rating_json
    
