from flask import Blueprint, jsonify, request
from model import Database

akun_bp = Blueprint("akun", __name__)

# ======================================================
# GET PROFILE
# ======================================================
@akun_bp.route("/akun", methods=["GET"])
def get_akun():

    db = Database()

    query = """
        SELECT *
        FROM profile
        LIMIT 1
    """

    result = db.execute_query(query, fetch=True)

    if result:
        return jsonify(result[0])

    return jsonify({})


# ======================================================
# TAMBAH PROFILE
# ======================================================
@akun_bp.route("/akun", methods=["POST"])
def tambah_akun():

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
        foto,
        nama_panggilan,
        tempat_lahir,
        tanggal_lahir,
        universitas,
        fakultas,
        program_studi,
        semester
    )
    VALUES
    (
        %s,%s,%s,%s,%s,%s,
        %s,%s,%s,%s,%s,%s,%s
    )
    """

    db.execute_query(query, (

        data.get("nama"),
        data.get("email"),
        data.get("telepon"),
        data.get("alamat"),
        data.get("deskripsi"),
        data.get("foto"),

        data.get("nama_panggilan"),
        data.get("tempat_lahir"),
        data.get("tanggal_lahir"),
        data.get("universitas"),
        data.get("fakultas"),
        data.get("program_studi"),
        data.get("semester")

    ))

    return jsonify({
        "message":"Profil berhasil ditambahkan"
    })


# ======================================================
# UPDATE PROFILE
# ======================================================
@akun_bp.route("/akun/<int:id>", methods=["PUT"])
def update_akun(id):

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
        foto=%s,

        nama_panggilan=%s,
        tempat_lahir=%s,
        tanggal_lahir=%s,
        universitas=%s,
        fakultas=%s,
        program_studi=%s,
        semester=%s

    WHERE id=%s
    """

    db.execute_query(query,(

        data.get("nama"),
        data.get("email"),
        data.get("telepon"),
        data.get("alamat"),
        data.get("deskripsi"),
        data.get("foto"),

        data.get("nama_panggilan"),
        data.get("tempat_lahir"),
        data.get("tanggal_lahir"),
        data.get("universitas"),
        data.get("fakultas"),
        data.get("program_studi"),
        data.get("semester"),

        id

    ))

    return jsonify({
        "message":"Profil berhasil diupdate"
    })


# ======================================================
# DELETE PROFILE
# ======================================================
@akun_bp.route("/akun/<int:id>", methods=["DELETE"])
def delete_akun(id):

    db = Database()

    query = """
    DELETE FROM profile
    WHERE id=%s
    """

    db.execute_query(query,(id,))

    return jsonify({
        "message":"Profil berhasil dihapus"
    })