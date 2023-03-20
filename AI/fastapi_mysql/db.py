from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

# pip install sqlalchemy
# pip install starlette

user_name = "eduuser"
user_pwd = "1234"
db_host = "127.0.0.1"
db_name = "edudb"

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
user_name, user_pwd, db_host, db_name
)

ENGINE = create_engine(
    DATABASE,
    encoding="utf-8",
    echo=True
)

session = scoped_session (
    sessionmaker(
        autocommit=False,
        autoflush=False,
    bind=ENGINE
    )
)

Base = declarative_base()
Base.query = session.query_property()
