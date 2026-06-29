from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config

load_dotenv()

# ==========================
# ADMIN BLUEPRINT
# ==========================
from Backend.admin.akun import akun_bp
from Backend.admin.login import login_bp
from Backend.admin.dashboard import dashboard_bp
from Backend.admin.profiles import profiles_bp
from Backend.admin.experience import experience_bp
from Backend.admin.projects import projects_bp
from Backend.admin.skills import skills_bp
from Backend.admin.upload import upload_bp
from Backend.admin.contact import contact_bp

# ==========================
# PORTFOLIO BLUEPRINT
# ==========================
from Backend.utama.profil import profil_bp


app = Flask(__name__)

app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY

CORS(app)

# ==========================
# REGISTER BLUEPRINT
# ==========================
app.register_blueprint(login_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")
app.register_blueprint(akun_bp, url_prefix="/api")
app.register_blueprint(profiles_bp, url_prefix="/api")
app.register_blueprint(skills_bp, url_prefix="/api")
app.register_blueprint(projects_bp, url_prefix="/api")
app.register_blueprint(experience_bp, url_prefix="/api")
app.register_blueprint(upload_bp, url_prefix="/api")
app.register_blueprint(contact_bp, url_prefix="/api")
app.register_blueprint(profil_bp, url_prefix="/api")

# ==========================
# INDEX
# ==========================
@app.route("/")
def index():
    return send_from_directory(".", "index.html")


# ==========================
# FRONTEND
# ==========================
@app.route("/Frontend/<path:filename>")
def frontend(filename):
    return send_from_directory("Frontend", filename)


# ==========================
# CSS
# ==========================
@app.route("/Frontend/admin/css/<path:filename>")
def admin_css(filename):
    return send_from_directory("Frontend/admin/css", filename)


# ==========================
# JS
# ==========================
@app.route("/Frontend/admin/js/<path:filename>")
def admin_js(filename):
    return send_from_directory("Frontend/admin/js", filename)


# ==========================
# IMAGE
# ==========================
@app.route("/Frontend/images/<path:filename>")
def images(filename):
    return send_from_directory("Frontend/images", filename)


# ==========================
# TEST CONFIG
# ==========================
@app.route("/api/test-config")
def test_config():
    return jsonify({
        "database": Config.TIDB_DATABASE,
        "tidb_host": Config.TIDB_HOST,
        "cloudinary": Config.CLOUDINARY_CLOUD_NAME,
        "resend": "Loaded" if Config.RESEND_API_KEY else "Not Loaded"
    })


# ==========================
# ERROR 404
# ==========================
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Route tidak ditemukan"
    }), 404


# ==========================
# ERROR 500
# ==========================
@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": str(error)
    }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=Config.DEBUG
    )