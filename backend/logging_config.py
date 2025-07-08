import logging
from logging.config import dictConfig


def setup_logging():
    dictConfig({
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
            },
            "file": {
                "class": "logging.FileHandler",
                "filename": "logs/app.log",  # make sure `logs/` dir exists
                "formatter": "default",
                "mode": "a",
            },
        },
        "root": {
            "level": "INFO",
            "handlers": ["console", "file"],
        },
    })
