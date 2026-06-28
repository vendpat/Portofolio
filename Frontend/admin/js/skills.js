let editId = null;

// ==========================
// LOAD DATA
// ==========================
window.onload = function () {
    loadSkills();
};

// ==========================
// GET ALL SKILLS
// ==========================
async function loadSkills() {

    try {

        const response = await fetch(`${API_URL}/admin/skills`);

        const data = await response.json();

        let html = "";

        data.forEach((item, index) => {

            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nama_skill}</td>
                    <td>${item.level_skill}</td>
                    <td>

                        <button class="edit-btn"
                            onclick="editSkill(${item.id})">

                            <i class="fa fa-pen"></i>
                            Edit

                        </button>

                        <button class="delete-btn"
                            onclick="deleteSkill(${item.id})">

                            <i class="fa fa-trash"></i>
                            Hapus

                        </button>

                    </td>
                </tr>
            `;

        });

        document.getElementById("skillTable").innerHTML = html;

    } catch (error) {

        console.error(error);

        alert("Gagal mengambil data skill");

    }

}

// ==========================
// MODAL
// ==========================
function openModal() {

    editId = null;

    document.getElementById("modalTitle").innerHTML = "Tambah Skill";

    document.getElementById("skillName").value = "";

    document.getElementById("proficiency").value = "";

    document.getElementById("modal").style.display = "flex";

}

function closeModal() {

    document.getElementById("modal").style.display = "none";

}

// ==========================
// SIMPAN DATA
// ==========================
async function saveSkill() {

    const nama_skill = document.getElementById("skillName").value;

    const level_skill = document.getElementById("proficiency").value;

    if (nama_skill == "" || level_skill == "") {

        alert("Lengkapi data terlebih dahulu");

        return;

    }

    const body = {

        nama_skill: nama_skill,

        level_skill: level_skill

    };

    try {

        if (editId == null) {

            await fetch(`${API_URL}/admin/skills`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)

            });

            alert("Skill berhasil ditambahkan");

        }

        else {

            await fetch(`${API_URL}/admin/skills/${editId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)

            });

            alert("Skill berhasil diupdate");

        }

        closeModal();

        loadSkills();

    }

    catch (error) {

        console.error(error);

        alert("Gagal menyimpan data");

    }

}

// ==========================
// EDIT
// ==========================
async function editSkill(id) {

    try {

        const response = await fetch(`${API_URL}/admin/skills/${id}`);

        const data = await response.json();

        editId = id;

        document.getElementById("modalTitle").innerHTML = "Edit Skill";

        document.getElementById("skillName").value = data.nama_skill;

        document.getElementById("proficiency").value = data.level_skill;

        document.getElementById("modal").style.display = "flex";

    }

    catch (error) {

        console.error(error);

        alert("Gagal mengambil data");

    }

}

// ==========================
// DELETE
// ==========================
async function deleteSkill(id) {

    if (!confirm("Yakin ingin menghapus skill ini?")) {

        return;

    }

    try {

        await fetch(`${API_URL}/admin/skills/${id}`, {

            method: "DELETE"

        });

        alert("Skill berhasil dihapus");

        loadSkills();

    }

    catch (error) {

        console.error(error);

        alert("Gagal menghapus skill");

    }

}