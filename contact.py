from flask import Blueprint, request, jsonify
from model import Database
from config import Config
import requests

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/contact", methods=["POST"])
def contact():

    try:

        data = request.json

        nama = data["nama"]
        email = data["email"]
        pesan = data["pesan"]

        db = Database()

        query = """
        INSERT INTO contacts
        (
            nama,
            email,
            pesan
        )
        VALUES
        (%s,%s,%s)
        """

        db.execute_query(query, (
            nama,
            email,
            pesan
        ))

        headers = {
            "Authorization": f"Bearer {Config.RESEND_API_KEY}",
            "Content-Type": "application/json"
        }

        body = {
            "from": Config.FROM_EMAIL,
            "to": [Config.TO_EMAIL],
            "subject": "Pesan Baru Portfolio",
            "html": f"""
            <h2>Pesan Baru</h2>

            <p><b>Nama :</b> {nama}</p>

            <p><b>Email :</b> {email}</p>

            <p><b>Pesan :</b></p>

            <p>{pesan}</p>
            """
        }

        requests.post(
            "https://api.resend.com/emails",
            headers=headers,
            json=body
        )

        return jsonify({
            "status":"success",
            "message":"Pesan berhasil dikirim"
        })

    except Exception as e:

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500