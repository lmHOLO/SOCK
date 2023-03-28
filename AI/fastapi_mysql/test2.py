import surprise
from surprise import SVD
from surprise import Dataset 
from surprise import accuracy 
from surprise.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd
import numpy as np



snack_db = pd.read_json('snack_test.json')
df = snack_db[['이름', '맛', '종류']]
df['특성'] = df['맛'] + " " + df['종류']
df = df[['이름', '특성']]
df
# print(df)

tfidf = TfidfVectorizer()

# 특성 출력
tfidf_matrix_voca = tfidf.fit(df['특성']).vocabulary_
total_feature = sorted(tfidf_matrix_voca.items())
feature_list = []
for i in range(len(total_feature)):
  feature_list.append(total_feature[i][0])

# 모든 과자의 이름
# print(df['이름'])

# # 모든 특성의 이름
# print(feature_list)


# 과자*특성 tfidf 행렬 생성
tfidf_matrix = tfidf.fit_transform(df['특성']).toarray()
# print(type(tfidf_matrix))

# print(pd.DataFrame(tfidf_matrix, columns=feature_list, index=df['이름']).head())

# 선호도 조사 dataset(1*데이터개수)

favor_list = [0, 1, 2, 3, 4]
second_list = [726, 727, 728]
prefer_dataset = [0]*len(tfidf_matrix)
# print(prefer_dataset)
for i in range(len(favor_list)):
  prefer_dataset[favor_list[i]] = 4

for i in range(len(second_list)):
  prefer_dataset[second_list[i]] = 2
prefer_dataset = np.array([prefer_dataset])
# print(prefer_dataset.shape)

user_pref = pd.DataFrame(np.dot(prefer_dataset, tfidf_matrix), columns=feature_list)
# print(user_pref)

print(pd.DataFrame(cosine_similarity(user_pref, tfidf_matrix), columns=df['이름']))