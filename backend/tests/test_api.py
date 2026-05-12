import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestLoginEndpoint:
    def test_login_success(self):
        response = client.post("/token", json={"username": "admin", "password": "admin123"})
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    def test_login_wrong_password(self):
        response = client.post("/token", json={"username": "admin", "password": "wrong"})
        assert response.status_code == 401

    def test_login_wrong_username(self):
        response = client.post("/token", json={"username": "notexist", "password": "admin123"})
        assert response.status_code == 401

    def test_login_missing_fields(self):
        response = client.post("/token", json={"username": "admin"})
        assert response.status_code == 422


class TestRefreshEndpoint:
    def _get_tokens(self):
        response = client.post("/token", json={"username": "admin", "password": "admin123"})
        return response.json()

    def test_refresh_success(self):
        tokens = self._get_tokens()
        response = client.post("/token/refresh", json={"refresh_token": tokens["refresh_token"]})
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    def test_refresh_with_access_token_fails(self):
        tokens = self._get_tokens()
        response = client.post("/token/refresh", json={"refresh_token": tokens["access_token"]})
        assert response.status_code == 401

    def test_refresh_with_invalid_token_fails(self):
        response = client.post("/token/refresh", json={"refresh_token": "invalidtoken"})
        assert response.status_code == 401


class TestProtectedEndpoint:
    def _get_access_token(self):
        response = client.post("/token", json={"username": "admin", "password": "admin123"})
        return response.json()["access_token"]

    def test_protected_with_valid_token(self):
        token = self._get_access_token()
        response = client.get("/protected", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert "admin" in data["message"]

    def test_protected_without_token(self):
        response = client.get("/protected")
        assert response.status_code == 401

    def test_protected_with_invalid_token(self):
        response = client.get("/protected", headers={"Authorization": "Bearer invalidtoken"})
        assert response.status_code == 401
