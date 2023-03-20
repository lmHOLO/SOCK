# pip install pymysql
# pip install sqlalchemy

user_name = "ssafy"
user_pwd = "ssafy"
db_host = "127.0.0.1"
db_name = "sock"

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
user_name, user_pwd, db_host, db_name
)