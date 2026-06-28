from flask import Blueprint, jsonify
from model import Database

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/admin/dashboard', methods=['GET'])
def dashboard():

    try:

        db = Database()

        profile = db.execute_query(
            "SELECT COUNT(*) AS total FROM profile",
            fetch=True
        )

        skills = db.execute_query(
            "SELECT COUNT(*) AS total FROM skills",
            fetch=True
        )

        experiences = db.execute_query(
            "SELECT COUNT(*) AS total FROM experiences",
            fetch=True
        )

        projects = db.execute_query(
            "SELECT COUNT(*) AS total FROM projects",
            fetch=True
        )

        return jsonify({
            "profile": profile[0]["total"],
            "skills": skills[0]["total"],
            "experiences": experiences[0]["total"],
            "projects": projects[0]["total"]
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500