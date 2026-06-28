from flask import Blueprint, jsonify, request
from model import Database

skills_bp = Blueprint("skills", __name__)

# ==========================================
# GET ALL SKILLS
# ==========================================
@skills_bp.route("/admin/skills", methods=["GET"])
def get_skills():

    try:

        db = Database()

        query = """
        SELECT *
        FROM skills
        ORDER BY id ASC
        """

        result = db.execute_query(
            query,
            fetch=True
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }),500


# ==========================================
# GET SKILL BY ID
# ==========================================
@skills_bp.route("/admin/skills/<int:id>", methods=["GET"])
def get_skill(id):

    try:

        db = Database()

        query = """
        SELECT *
        FROM skills
        WHERE id=%s
        """

        result = db.execute_query(
            query,
            (id,),
            fetch=True
        )

        if len(result) == 0:

            return jsonify({
                "status":"error",
                "message":"Skill tidak ditemukan"
            }),404

        return jsonify(result[0])

    except Exception as e:

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500


# ==========================================
# CREATE SKILL
# ==========================================
@skills_bp.route("/admin/skills", methods=["POST"])
def create_skill():

    try:

        data = request.get_json()

        db = Database()

        query = """
        INSERT INTO skills
        (
            nama_skill,
            level_skill
        )
        VALUES(%s,%s)
        """

        db.execute_query(
            query,
            (
                data["nama_skill"],
                data["level_skill"]
            )
        )

        return jsonify({
            "status":"success",
            "message":"Skill berhasil ditambahkan"
        })

    except Exception as e:

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500


# ==========================================
# UPDATE SKILL
# ==========================================
@skills_bp.route("/admin/skills/<int:id>", methods=["PUT"])
def update_skill(id):

    try:

        data = request.get_json()

        db = Database()

        query = """
        UPDATE skills
        SET
            nama_skill=%s,
            level_skill=%s
        WHERE id=%s
        """

        db.execute_query(
            query,
            (
                data["nama_skill"],
                data["level_skill"],
                id
            )
        )

        return jsonify({
            "status":"success",
            "message":"Skill berhasil diupdate"
        })

    except Exception as e:

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500


# ==========================================
# DELETE SKILL
# ==========================================
@skills_bp.route("/admin/skills/<int:id>", methods=["DELETE"])
def delete_skill(id):

    try:

        db = Database()

        query = """
        DELETE FROM skills
        WHERE id=%s
        """

        db.execute_query(
            query,
            (id,)
        )

        return jsonify({
            "status":"success",
            "message":"Skill berhasil dihapus"
        })

    except Exception as e:

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500