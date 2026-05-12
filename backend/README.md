# JWT Authentication API

A FastAPI application that implements JWT (JSON Web Token) authentication with token refresh support.

## Features

- **Login endpoint** – authenticate with username/password and receive an access token (300 s) and a refresh token (24 h).
- **Token refresh endpoint** – exchange a valid refresh token for a new pair of tokens.
- **Protected endpoint** – example endpoint that requires a valid access token.
- Dependency management with **Poetry**.
- Containerised with **Docker** and **Docker Compose**.

---

## Credentials

| Field    | Value      |
|----------|------------|
| username | `admin`    |
| password | `admin123` |

---

## Endpoints

| Method | Path             | Description                       | Auth required |
|--------|------------------|-----------------------------------|---------------|
| POST   | `/token`         | Login – get access & refresh tokens | No          |
| POST   | `/token/refresh` | Refresh the access token          | No (refresh token in body) |
| GET    | `/protected`     | Example protected resource        | Yes (Bearer)  |

Interactive API docs are available at **`/docs`** (Swagger UI) and **`/redoc`** once the server is running.

---

## Quick start with Docker Compose

```bash
# From the backend/ directory:
docker compose up --build
```

The API will be available at `http://localhost:8000`.

---

## Quick start without Docker (using Poetry)

### Prerequisites

- Python 3.12+
- [Poetry](https://python-poetry.org/docs/#installation)

### Install dependencies

```bash
cd backend
poetry install
```

### Run the development server

```bash
poetry run uvicorn app.main:app --reload
```

---

## Usage examples

### 1. Obtain tokens

```bash
curl -X POST http://localhost:8000/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Response:**

```json
{
  "access_token": "<jwt_access_token>",
  "refresh_token": "<jwt_refresh_token>",
  "token_type": "bearer"
}
```

The `access_token` expires in **300 seconds**. The `refresh_token` expires in **24 hours**.

---

### 2. Access a protected resource

```bash
curl http://localhost:8000/protected \
  -H "Authorization: Bearer <access_token>"
```

**Response:**

```json
{
  "message": "Hello, admin! You have access to this protected resource."
}
```

---

### 3. Refresh the access token

```bash
curl -X POST http://localhost:8000/token/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token>"}'
```

**Response:**

```json
{
  "access_token": "<new_jwt_access_token>",
  "refresh_token": "<new_jwt_refresh_token>",
  "token_type": "bearer"
}
```

---

## Environment variables

| Variable    | Description                  |
|-------------|------------------------------|
| `SECRET_KEY`| Secret used to sign JWTs. **Always change this in production!** |

A `.env.example` file is included. Copy it to `.env` before starting the container:

```bash
cp .env.example .env
# Then edit .env and set a strong SECRET_KEY
```

> **Never commit `.env` to version control.** The `.gitignore` already excludes it.

---

## Running tests

```bash
cd backend
poetry install
poetry run pytest -v
```

---

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py        # JWT creation / verification, password hashing
│   ├── config.py      # Settings and in-memory user store
│   ├── main.py        # FastAPI application and route definitions
│   └── models.py      # Pydantic request / response models
├── tests/
│   ├── __init__.py
│   └── test_api.py    # Pytest test suite
├── docker-compose.yml
├── Dockerfile
├── pyproject.toml
└── README.md
```
