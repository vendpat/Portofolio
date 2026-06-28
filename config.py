import os
from dotenv import load_dotenv

# Load file .env
load_dotenv()


class Config:

    # ==========================
    # FLASK
    # ==========================
    DEBUG = True
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY")

    # ==========================
    # TiDB
    # ==========================
    TIDB_HOST = os.getenv("TIDB_HOST")
    TIDB_PORT = os.getenv("TIDB_PORT")
    TIDB_USER = os.getenv("TIDB_USER")
    TIDB_PASSWORD = os.getenv("TIDB_PASSWORD")
    TIDB_DATABASE = os.getenv("TIDB_DATABASE")

    # ==========================
    # Cloudinary
    # ==========================
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    # ==========================
    # Resend
    # ==========================
    RESEND_API_KEY = os.getenv("RESEND_API_KEY")
    FROM_EMAIL = os.getenv("FROM_EMAIL")
    TO_EMAIL = os.getenv("TO_EMAIL")