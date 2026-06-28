from flask import Blueprint, jsonify, request
from model import Database

profiles_bp = Blueprint('profiles', __name__)

# ==========================
# GET PROFILE
# ==========================
@profiles_bp.route('/admin/profiles', methods=['GET'])
def get_profile():
    try:
        db = Database()

        query = """
        SELECT *
        FROM profile
        LIMIT 1
        """

        result = db.execute_query(query, fetch=True)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==========================
# CREATE PROFILE
# ==========================
@profiles_bp.route('/admin/profiles', methods=['POST'])
def create_profile():
    try:
        data = request.json

        db = Database()

        query = """
        INSERT INTO profile
        (
            nama,
            email,
            telepon,
            alamat,
            deskripsi,
            foto
        )
        VALUES (%s,%s,%s,%s,%s,%s)
        """

        db.execute_query(query, (
            data['nama'],
            data['email'],
            data['telepon'],
            data['alamat'],
            data['deskripsi'],
            data['foto']
        ))

        return jsonify({
            "message": "Profil berhasil ditambahkan"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==========================
# UPDATE PROFILE
# ==========================
@profiles_bp.route('/admin/profiles/<int:id>', methods=['PUT'])
def update_profile(id):
    try:
        data = request.json

        db = Database()

        query = """
        UPDATE profile
        SET
            nama=%s,
            email=%s,
            telepon=%s,
            alamat=%s,
            deskripsi=%s,
            foto=%s
        WHERE id=%s
        """

        db.execute_query(query, (
            data['nama'],
            data['email'],
            data['telepon'],
            data['alamat'],
            data['deskripsi'],
            data['foto'],
            id
        ))

        return jsonify({
            "message": "Profil berhasil diupdate"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==========================
# DELETE PROFILE
# ==========================
@profiles_bp.route('/admin/profiles/<int:id>', methods=['DELETE'])
def delete_profile(id):
    try:
        db = Database()

        query = """
        DELETE FROM profile
        WHERE id=%s
        """

        db.execute_query(query, (id,))

        return jsonify({
            "message": "Profil berhasil dihapus"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500