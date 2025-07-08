# main.py
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth
from .routers import muscles, bony_landmarks, diseases, terminologies, favorite

from .logging_config import setup_logging

setup_logging()

app = FastAPI()


logger = logging.getLogger(__name__)
logger.info("Physiology FastAPI server starting")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://arcticcircle.work", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(bony_landmarks.router)
app.include_router(muscles.router)
app.include_router(diseases.router)
app.include_router(terminologies.router)
app.include_router(favorite.router)
