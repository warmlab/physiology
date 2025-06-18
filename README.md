# Anatomy & Physiology Study Platform

A modern full-stack web application for studying human anatomy and physiology. Built with:

- ✨ **Deno + Fresh** (frontend)
- ⚡ **FastAPI** (backend)
- 🐃 **PostgreSQL** (database)
- 📦 **Docker** for deployment
- 🌐 **Nginx** as a reverse proxy

---

## 📆 Project Structure

```
physiology/
├── backend/               # FastAPI backend
│   ├── main.py            # FastAPI app
│   ├── models/            # SQLAlchemy models
│   ├── schemas/           # Pydantic schemas
│   ├── routes/            # API endpoints
│   ├── database.py        # Database config
│   ├── alembic/           # Migrations
│   └── scripts/           # Data insert utilities
├── frontend/              # Fresh frontend (Deno)
│   ├── islands/           # Interactive components
│   ├── routes/            # Pages (muscles.tsx, terminology.tsx)
│   ├── components/        # UI widgets
│   ├── static/            # Images, assets
│   └── types/             # Shared types
├── docker-compose.yml     # Dev/prod orchestration
├── nginx.conf              # Nginx reverse proxy
├── Dockerfile.backend      # FastAPI Dockerfile
├── Dockerfile.frontend     # Fresh Dockerfile
└── README.md
```

---

## 🚀 Quick Start

### 1. With Docker

```bash
git clone https://github.com/warmlab/physiology.git
cd physiology
docker-compose up --build
```

- App: [http://localhost](http://localhost)
- API: [http://localhost/api/](http://localhost/backend/)
- Fresh frontend served through Nginx

### 2. Manual Setup (dev)

#### Backend (FastAPI)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend (Fresh)

```bash
cd frontend
deno task start
```

---

## 🌐 Nginx Example Config

```nginx
server {
  listen 80;
  server_name arcticcircle.work;

  location / {
    proxy_pass http://frontend:3000;
  }

  location /api/ {
    proxy_pass http://backend:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

---

## 📃 Sample Data

To insert muscles from Excel:

```bash
cd backend
python scripts/insert_y1_muscles.py
```

---

## 🌟 Features

-

---

## 🎓 License

MIT License

---

## ✨ Maintained by [@warmlab](https://github.com/warmlab)

Pull requests are welcome!
