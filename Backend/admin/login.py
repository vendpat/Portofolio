from flask import Blueprint, request, jsonify

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":

        return jsonify({
            "status":"success",
            "message":"Login berhasil"
        })

    return jsonify({
        "status":"error",
        "message":"Username atau password salah"
    }),401