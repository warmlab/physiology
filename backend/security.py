from datetime import datetime, timedelta
from authlib.jose import jwt

SECRET_KEY = "your_jwt_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 1 day


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": int(expire.timestamp())})
    header = {"alg": ALGORITHM}
    token = jwt.encode(header, to_encode, SECRET_KEY)
    return token.decode("utf-8")
