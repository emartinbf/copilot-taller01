import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey1234567890abcdef1234567890abcdef")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 86400  # 24 hours

USERS_DB = {
    "admin": {
        "username": "admin",
        "hashed_password": "$2b$12$oyGTqnbWi4rTZ.cjdlejgOGZPlcgErNr.kIy0NOsPzKCViYBdkJry",  # admin123
    }
}
