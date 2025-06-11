# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, bookings
from .routers import muscles, bony_landmarks, diseases, terminologies

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://arcticcircle.work"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(bookings.router)
app.include_router(bony_landmarks.router)
app.include_router(muscles.router)
app.include_router(diseases.router)
app.include_router(terminologies.router)
