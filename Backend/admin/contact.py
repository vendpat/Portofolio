from flask import Blueprint, request, jsonify
from model import Database
from config import Config
import resend

contact_bp = Blueprint("contact", __name__)

resend.api_key = Config.RESEND_API_KEY


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
        (nama,email,pesan)
        VALUES (%s,%s,%s)
        """

        db.execute_query(query, (
            nama,
            email,
            pesan
        ))

        resend.Emails.send({
            "from": Config.FROM_EMAIL,
            "to": Config.TO_EMAIL,
            "subject": "Pesan Baru Portfolio",
            "html": f"""
            <h2>Pesan Baru</h2>

            <p><b>Nama :</b> {nama}</p>

            <p><b>Email :</b> {email}</p>

            <p><b>Pesan :</b></p>

            <p>{pesan}</p>
            """
        })

        return jsonify({
            "message": "Pesan berhasil dikirim"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }),500