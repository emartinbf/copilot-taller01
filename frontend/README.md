# Compliance Platform – Frontend

A React single-page application that provides a login screen and an authenticated welcome dashboard. It consumes the JWT authentication API provided by the companion `backend/` service.

---

## Features

- **Login page** – authenticates against the backend `POST /token` endpoint and stores the JWT access token in `sessionStorage`.
- **Welcome page** – protected route; only accessible after a successful login. Fetches user data from the backend `GET /protected` endpoint and displays session metadata.
- **Route protection** – any attempt to navigate to `/welcome` without an active session redirects to `/login`.
- **Sign out** – clears the session tokens and returns the user to the login screen.
- Designed according to the **DESIGN.md** system (Inter typeface, glass surfaces, #0F172A palette, 12 px grid).

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| CSS Modules | Scoped component styles |

---

## Prerequisites

- **Node.js ≥ 18**
- The `backend/` service must be running (see `backend/README.md`)

---

## Quick start

```bash
# 1. Enter the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. (Optional) Configure the backend URL
cp .env.example .env
# Edit VITE_API_URL if the backend is not on http://localhost:8000

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Base URL for the backend API |

Create a `.env` file (copy from `.env.example`) to override the defaults.

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Project structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── api/
│   │   └── auth.js     # Fetch wrappers for backend endpoints
│   ├── components/
│   │   └── ProtectedRoute.jsx  # Auth guard component
│   ├── pages/
│   │   ├── Login.jsx           # Login form page
│   │   ├── Login.module.css
│   │   ├── Welcome.jsx         # Authenticated dashboard page
│   │   └── Welcome.module.css
│   ├── utils/
│   │   └── auth.js     # sessionStorage helpers (get/set/clear tokens)
│   ├── App.jsx          # Route definitions
│   ├── index.css        # Global design-system tokens & reset
│   └── main.jsx         # React + Router entry point
├── index.html
├── .env.example
├── package.json
└── vite.config.js
```

---

## Usage

1. **Start the backend** (see `backend/README.md`).
2. **Start the frontend** (`npm run dev`).
3. Open **http://localhost:5173** – you will be redirected to the login page.
4. Sign in with the default credentials:

   | Field    | Value     |
   |----------|-----------|
   | Username | `admin`   |
   | Password | `admin123`|

5. After a successful login you will land on the **Welcome** page, which displays your username and a message from the protected backend endpoint.
6. Click **Sign out** to end the session and return to the login screen.

---

## Design system

Styles follow the `DESIGN.md` specification at the repository root:

- **Colour palette** – primary `#0F172A`, background `#FAFAFA`, surface `#F8F9FA`.
- **Typography** – Inter, sizes 14 px / 16 px / 22 px.
- **Surfaces** – glass effect (backdrop-filter blur 12 px) with a gradient border shell.
- **Spacing** – 12 px base rhythm (1 px, 12 px, 16 px, 20 px, 64 px scale).
- **Radii** – 4 px (controls), 15–16 px (cards), 24 px (hero shell).
- **Motion** – transitions at 160–200 ms with `cubic-bezier(0.23, 1, 0.32, 1)` easing.
