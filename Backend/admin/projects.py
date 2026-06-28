from flask import Blueprint, jsonify, request
from model import Database

projects_bp = Blueprint('projects', __name__)

# ==========================
# GET PROJECTS
# ==========================
@projects_bp.route('/admin/projects', methods=['GET'])
def get_projects():

    db = Database()

    query = """
    SELECT *
    FROM projects
    ORDER BY id DESC
    """

    result = db.execute_query(query, fetch=True)

    return jsonify(result)


# ==========================
# CREATE PROJECT
# ==========================
@projects_bp.route('/admin/projects', methods=['POST'])
def create_project():

    data = request.json

    db = Database()

    query = """
    INSERT INTO projects
    (
        nama_proyek,
        deskripsi,
        gambar,
        github_link,
        demo_link
    )
    VALUES (%s,%s,%s,%s,%s)
    """

    db.execute_query(query, (
        data['nama_proyek'],
        data['deskripsi'],
        data['gambar'],
        data['github_link'],
        data['demo_link']
    ))

    return jsonify({
        "message": "Project berhasil ditambahkan"
    })


# ==========================
# UPDATE PROJECT
# ==========================
@projects_bp.route('/admin/projects/<int:id>', methods=['PUT'])
def update_project(id):

    data = request.json

    db = Database()

    query = """
    UPDATE projects
    SET
        nama_proyek=%s,
        deskripsi=%s,
        gambar=%s,
        github_link=%s,
        demo_link=%s
    WHERE id=%s
    """

    db.execute_query(query, (
        data['nama_proyek'],
        data['deskripsi'],
        data['gambar'],
        data['github_link'],
        data['demo_link'],
        id
    ))

    return jsonify({
        "message": "Project berhasil diupdate"
    })


# ==========================
# DELETE PROJECT
# ==========================
@projects_bp.route('/admin/projects/<int:id>', methods=['DELETE'])
def delete_project(id):

    db = Database()

    query = """
    DELETE FROM projects
    WHERE id=%s
    """

    db.execute_query(query, (id,))

    return jsonify({
        "message": "Project berhasil dihapus"
    })