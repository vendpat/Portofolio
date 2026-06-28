from flask import Blueprint, request, jsonify
import traceback
import cloudinary
import cloudinary.uploader
from config import Config

upload_bp = Blueprint("upload", __name__)

# ==========================
# KONFIGURASI CLOUDINARY
# ==========================
cloudinary.config(
    cloud_name=Config.CLOUDINARY_CLOUD_NAME,
    api_key=Config.CLOUDINARY_API_KEY,
    api_secret=Config.CLOUDINARY_API_SECRET,
    secure=True
)

# ==========================
# UPLOAD IMAGE
# ==========================
@upload_bp.route("/upload", methods=["POST"])
def upload_image():

    try:

        # cek apakah file dikirim
        if "image" not in request.files:
            return jsonify({
                "success": False,
                "message": "File image tidak ditemukan"
            }), 400

        image = request.files["image"]

        # cek file kosong
        if image.filename == "":
            return jsonify({
                "success": False,
                "message": "Belum memilih gambar"
            }), 400

        # upload ke cloudinary
        result = cloudinary.uploader.upload(
            image,
            folder="portfolio"
        )

        return jsonify({
            "success": True,
            "url": result["secure_url"],
            "public_id": result["public_id"]
        }), 200

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==========================
# TEST CLOUDINARY
# ==========================
@upload_bp.route("/test-upload", methods=["GET"])
def test_upload():

    return jsonify({
        "cloud_name": Config.CLOUDINARY_CLOUD_NAME,
        "api_key": Config.CLOUDINARY_API_KEY,
        "api_secret": Config.CLOUDINARY_API_SECRET[:5] + "*****"
    })