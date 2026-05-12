# copilot-taller01

Full-stack JWT authentication demo — FastAPI backend + React frontend.

---

## Project structure

```
copilot-taller01/
├── backend/     # FastAPI JWT authentication API (Python / Poetry)
├── frontend/    # React SPA – login & welcome pages (Vite / React Router)
├── DESIGN.md    # Design-system specification used by the frontend
└── README.md    # This file
```

---

## Quick start

### 1. Start the backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
# API available at http://localhost:8000
# Interactive docs at http://localhost:8000/docs
```

Default credentials: **username** `admin` / **password** `admin123`

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

Open **http://localhost:5173**, sign in, and explore the welcome dashboard.

---

## Detailed documentation

| Component | README |
|-----------|--------|
| Backend | [`backend/README.md`](backend/README.md) |
| Frontend | [`frontend/README.md`](frontend/README.md) |
| Design system | [`DESIGN.md`](DESIGN.md) |
