from pydantic import BaseModel
from typing import Optional


class TokenRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    token_type: Optional[str] = None


class RefreshRequest(BaseModel):
    refresh_token: str


class UserInDB(BaseModel):
    username: str
    hashed_password: str
