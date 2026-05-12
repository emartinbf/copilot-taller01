from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.auth import authenticate_user, create_access_token, create_refresh_token, decode_token
from app.models import Token, TokenRequest, RefreshRequest

app = FastAPI(
    title="JWT Authentication API",
    description="FastAPI JWT authentication with token refresh support",
    version="0.1.0",
)

bearer_scheme = HTTPBearer()


@app.post("/token", response_model=Token, summary="Login and obtain JWT tokens")
def login(request: TokenRequest):
    """
    Authenticate with username and password.

    - **username**: admin
    - **password**: admin123

    Returns an access token (valid 300 seconds) and a refresh token (valid 24 hours).
    """
    user = authenticate_user(request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@app.post("/token/refresh", response_model=Token, summary="Refresh the access token")
def refresh_token(request: RefreshRequest):
    """
    Obtain a new access token using a valid refresh token.

    - **refresh_token**: a previously issued refresh token
    """
    token_data = decode_token(request.refresh_token)
    if token_data is None or token_data.token_type != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": token_data.username})
    new_refresh_token = create_refresh_token(data={"sub": token_data.username})

    return Token(
        access_token=access_token,
        refresh_token=new_refresh_token,
        token_type="bearer",
    )


@app.get("/protected", summary="Example protected endpoint")
def protected_route(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """
    A sample protected endpoint that requires a valid access token.
    """
    token_data = decode_token(credentials.credentials)
    if token_data is None or token_data.token_type != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"message": f"Hello, {token_data.username}! You have access to this protected resource."}
