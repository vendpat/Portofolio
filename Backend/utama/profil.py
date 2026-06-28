from flask import Blueprint, jsonify
from model import Database

profil_bp = Blueprint('profil', __name__)

# Ambil seluruh data portfolio
@profil_bp.route('/portfolio', methods=['GET'])
def get_portfolio():

    db = Database()

    try:

        profile = db.execute_query(
            "SELECT * FROM profile LIMIT 1",
            fetch=True
        )

        skills = db.execute_query(
            "SELECT * FROM skills",
            fetch=True
        )

        experiences = db.execute_query(
            "SELECT * FROM experiences ORDER BY id DESC",
            fetch=True
        )

        projects = db.execute_query(
            "SELECT * FROM projects ORDER BY id DESC",
            fetch=True
        )

        return jsonify({
            "profile": profile[0] if profile else {},
            "skills": skills,
            "experiences": experiences,
            "projects": projects
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# Ambil data profile saja
@profil_bp.route('/profile', methods=['GET'])
def get_profile():

    db = Database()

    result = db.execute_query(
        "SELECT * FROM profile LIMIT 1",
        fetch=True
    )

    return jsonify(result)


# Ambil skill saja
@profil_bp.route('/skills', methods=['GET'])
def get_skills():

    db = Database()

    result = db.execute_query(
        "SELECT * FROM skills",
        fetch=True
    )

    return jsonify(result)


# Ambil pengalaman saja
@profil_bp.route('/experiences', methods=['GET'])
def get_experiences():

    db = Database()

    result = db.execute_query(
        "SELECT * FROM experiences ORDER BY id DESC",
        fetch=True
    )

    return jsonify(result)


# Ambil project saja
@profil_bp.route('/projects', methods=['GET'])
def get_projects():

    db = Database()

    result = db.execute_query(
        "SELECT * FROM projects ORDER BY id DESC",
        fetch=True
    )

    return jsonify(result)