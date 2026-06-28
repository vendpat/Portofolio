let editId = null;

loadExperience();

// ===========================
// LOAD EXPERIENCE
// ===========================

async function loadExperience() {

    try {

        const res = await fetch(API_URL + "/admin/experience");

        const data = await res.json();

        let html = "";

        data.forEach((item, index) => {

            html += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.periode}</td>

                <td>${item.jabatan}</td>

                <td>${item.perusahaan}</td>

                <td>

                    <button class="edit"
                        onclick="editExperience(${item.id})">

                        <i class="fa fa-pen"></i>

                    </button>

                    <button class="delete"
                        onclick="deleteExperience(${item.id})">

                        <i class="fa fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById("experienceTable").innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}


// ===========================
// SIMPAN
// ===========================

async function saveExperience() {

    const data = {

        periode: document.getElementById("periode").value,

        jabatan: document.getElementById("jabatan").value,

        perusahaan: document.getElementById("perusahaan").value,

        deskripsi: document.getElementById("deskripsi").value

    };

    if (editId == null) {

        await fetch(API_URL + "/admin/experience", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

    }

    else {

        await fetch(API_URL + "/admin/experience/" + editId, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

    }

    resetForm();

    loadExperience();

}


// ===========================
// EDIT
// ===========================

async function editExperience(id) {

    const res = await fetch(API_URL + "/admin/experience/" + id);

    const data = await res.json();

    editId = id;

    document.getElementById("periode").value = data.periode;

    document.getElementById("jabatan").value = data.jabatan;

    document.getElementById("perusahaan").value = data.perusahaan;

    document.getElementById("deskripsi").value = data.deskripsi;

}


// ===========================
// DELETE
// ===========================

async function deleteExperience(id) {

    if (!confirm("Yakin ingin menghapus?")) return;

    await fetch(API_URL + "/admin/experience/" + id, {

        method: "DELETE"

    });

    loadExperience();

}


// ===========================
// RESET
// ===========================

function resetForm() {

    editId = null;

    document.getElementById("experienceId").value = "";

    document.getElementById("periode").value = "";

    document.getElementById("jabatan").value = "";

    document.getElementById("perusahaan").value = "";

    document.getElementById("deskripsi").value = "";

}