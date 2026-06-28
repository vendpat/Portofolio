from flask import Blueprint, request, jsonify
from model import Database

experience_bp = Blueprint("experience", __name__)


# =====================================================
# GET ALL EXPERIENCE
# =====================================================

@experience_bp.route("/admin/experience", methods=["GET"])
def get_experience():

    try:

        db = Database()

        query = """
            SELECT
                id,
                periode,
                jabatan,
                perusahaan,
                deskripsi
            FROM experiences
            ORDER BY id DESC
        """

        data = db.execute_query(query, fetch=True)

        return jsonify(data), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =====================================================
# GET BY ID
# =====================================================

@experience_bp.route("/admin/experience/<int:id>", methods=["GET"])
def get_one_experience(id):

    try:

        db = Database()

        query = """
            SELECT
                id,
                periode,
                jabatan,
                perusahaan,
                deskripsi
            FROM experiences
            WHERE id=%s
        """

        data = db.execute_query(query, (id,), fetch=True)

        if not data:

            return jsonify({
                "error": "Data tidak ditemukan"
            }), 404

        return jsonify(data[0]), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =====================================================
# INSERT
# =====================================================

@experience_bp.route("/admin/experience", methods=["POST"])
def insert_experience():

    try:

        body = request.get_json()

        periode = body.get("periode")
        jabatan = body.get("jabatan")
        perusahaan = body.get("perusahaan")
        deskripsi = body.get("deskripsi")

        db = Database()

        query = """
            INSERT INTO experiences
            (
                periode,
                jabatan,
                perusahaan,
                deskripsi
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
        """

        db.execute_query(
            query,
            (
                periode,
                jabatan,
                perusahaan,
                deskripsi
            )
        )

        return jsonify({
            "message": "Berhasil ditambahkan"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =====================================================
# UPDATE
# =====================================================

@experience_bp.route("/admin/experience/<int:id>", methods=["PUT"])
def update_experience(id):

    try:

        body = request.get_json()

        periode = body.get("periode")
        jabatan = body.get("jabatan")
        perusahaan = body.get("perusahaan")
        deskripsi = body.get("deskripsi")

        db = Database()

        query = """
            UPDATE experiences
            SET
                periode=%s,
                jabatan=%s,
                perusahaan=%s,
                deskripsi=%s
            WHERE id=%s
        """

        db.execute_query(
            query,
            (
                periode,
                jabatan,
                perusahaan,
                deskripsi,
                id
            )
        )

        return jsonify({
            "message": "Berhasil diupdate"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =====================================================
# DELETE
# =====================================================

@experience_bp.route("/admin/experience/<int:id>", methods=["DELETE"])
def delete_experience(id):

    try:

        db = Database()

        query = """
            DELETE FROM experiences
            WHERE id=%s
        """

        db.execute_query(query, (id,))

        return jsonify({
            "message": "Berhasil dihapus"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500