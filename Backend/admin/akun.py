from flask import Blueprint, jsonify, request
from model import Database

akun_bp = Blueprint('akun', __name__)

@akun_bp.route('/akun', methods=['GET'])
def get_akun():
    db = Database()

    query = """
    SELECT * FROM profile
    """

    result = db.execute_query(query, fetch=True)

    return jsonify(result)


@akun_bp.route('/akun', methods=['POST'])
def tambah_akun():

    data = request.json

    db = Database()

    query = """
    INSERT INTO profile
    (nama,email,telepon,alamat,deskripsi,foto)
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

    return jsonify({"message":"Profil berhasil ditambahkan"})