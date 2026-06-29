// ===============================
// API URL
// ===============================

const API = API_URL + "/akun";

let profileId = null;

// ===============================
// LOAD DATA
// ===============================

window.onload = function () {

    loadProfile();

};

// ===============================
// AMBIL DATA PROFILE
// ===============================

async function loadProfile(){

    try{

        const response = await fetch(API);

        const data = await response.json();

        console.log(data);

        if(!data) return;

        profileId = data.id;

        document.getElementById("nama").value = data.nama || "";

        document.getElementById("nama_panggilan").value = data.nama_panggilan || "";

        document.getElementById("email").value = data.email || "";

        document.getElementById("telepon").value = data.telepon || "";

        document.getElementById("alamat").value = data.alamat || "";

        document.getElementById("deskripsi").value = data.deskripsi || "";

        document.getElementById("foto").value = data.foto || "";

        document.getElementById("tempat_lahir").value = data.tempat_lahir || "";

        document.getElementById("tanggal_lahir").value = data.tanggal_lahir || "";

        document.getElementById("universitas").value = data.universitas || "";

        document.getElementById("fakultas").value = data.fakultas || "";

        document.getElementById("program_studi").value = data.program_studi || "";

        document.getElementById("semester").value = data.semester || "";

        if(data.foto){

            document.getElementById("preview").src = data.foto;

            document.getElementById("preview").style.display = "block";

        }

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// SIMPAN DATA
// ===============================

document.getElementById("profileForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const body = {

        nama : document.getElementById("nama").value,

        nama_panggilan : document.getElementById("nama_panggilan").value,

        email : document.getElementById("email").value,

        telepon : document.getElementById("telepon").value,

        alamat : document.getElementById("alamat").value,

        deskripsi : document.getElementById("deskripsi").value,

        foto : document.getElementById("foto").value,

        tempat_lahir : document.getElementById("tempat_lahir").value,

        tanggal_lahir : document.getElementById("tanggal_lahir").value,

        universitas : document.getElementById("universitas").value,

        fakultas : document.getElementById("fakultas").value,

        program_studi : document.getElementById("program_studi").value,

        semester : document.getElementById("semester").value

    };

    try{

        let response;

        // ===========================
        // UPDATE
        // ===========================

        if(profileId){

            response = await fetch(API + "/" + profileId,{

                method:"PUT",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(body)

            });

        }

        // ===========================
        // INSERT
        // ===========================

        else{

            response = await fetch(API,{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(body)

            });

        }

        const result = await response.json();

        alert(result.message);

        loadProfile();

    }

    catch(error){

        console.log(error);

        alert("Gagal menyimpan data.");

    }

});

// ===============================
// PREVIEW FOTO
// ===============================

document.getElementById("foto").addEventListener("keyup",function(){

    if(this.value!=""){

        document.getElementById("preview").src=this.value;

        document.getElementById("preview").style.display="block";

    }

});