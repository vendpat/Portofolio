// ===============================
// PROJECTS.JS
// CRUD PROJECT
// ===============================

let editId = null;
let imageUrl = "";

loadProjects();

// ===============================
// LOAD PROJECTS
// ===============================
async function loadProjects() {

    try{

        const res = await fetch(API_URL + "/admin/projects");
        const data = await res.json();

        let html = "";

        data.forEach((project,index)=>{

            html += `
            <tr>

                <td>${index+1}</td>

                <td>
                    <img src="${project.gambar}"
                    style="width:90px;height:60px;object-fit:cover;border-radius:8px;">
                </td>

                <td>${project.nama_proyek}</td>

                <td>${project.github_link}</td>

                <td>${project.demo_link}</td>

                <td>

                    <button class="btn-edit"
                    onclick='editProject(${JSON.stringify(project)})'>
                        <i class="fa fa-pen"></i>
                    </button>

                    <button class="btn-delete"
                    onclick="deleteProject(${project.id})">
                        <i class="fa fa-trash"></i>
                    </button>

                </td>

            </tr>
            `;

        });

        document.getElementById("projectTable").innerHTML = html;

    }

    catch(err){

        console.log(err);

    }

}


// ===============================
// UPLOAD GAMBAR
// ===============================
async function uploadImage(){

    const file=document.getElementById("gambar").files[0];

    if(!file) return imageUrl;

    const formData=new FormData();

    formData.append("image",file);

    try{

        const res=await fetch(API_URL+"/upload",{

            method:"POST",
            body:formData

        });

        const result=await res.json();

        imageUrl=result.url;

        return imageUrl;

    }

    catch(err){

        console.log(err);

        return imageUrl;

    }

}



// ===============================
// SAVE PROJECT
// ===============================
async function saveProject(){

    if(document.getElementById("gambar").files.length>0){

        await uploadImage();

    }

    const data={

        nama_proyek:document.getElementById("nama_proyek").value,

        deskripsi:document.getElementById("deskripsi").value,

        gambar:imageUrl,

        github_link:document.getElementById("github_link").value,

        demo_link:document.getElementById("demo_link").value

    };


    try{

        if(editId==null){

            await fetch(API_URL+"/admin/projects",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)

            });

        }

        else{

            await fetch(API_URL+"/admin/projects/"+editId,{

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)

            });

        }

        resetForm();

        loadProjects();

    }

    catch(err){

        console.log(err);

    }

}



// ===============================
// EDIT PROJECT
// ===============================
function editProject(project){

    editId=project.id;

    imageUrl=project.gambar;

    document.getElementById("nama_proyek").value=project.nama_proyek;

    document.getElementById("deskripsi").value=project.deskripsi;

    document.getElementById("github_link").value=project.github_link;

    document.getElementById("demo_link").value=project.demo_link;

    document.getElementById("preview").src=project.gambar;

}



// ===============================
// DELETE
// ===============================
async function deleteProject(id){

    if(!confirm("Yakin ingin menghapus project?")) return;

    try{

        await fetch(API_URL+"/admin/projects/"+id,{

            method:"DELETE"

        });

        loadProjects();

    }

    catch(err){

        console.log(err);

    }

}



// ===============================
// RESET
// ===============================
function resetForm(){

    editId=null;

    imageUrl="";

    document.getElementById("nama_proyek").value="";

    document.getElementById("deskripsi").value="";

    document.getElementById("github_link").value="";

    document.getElementById("demo_link").value="";

    document.getElementById("gambar").value="";

    document.getElementById("preview").src="";

}



// ===============================
// PREVIEW IMAGE
// ===============================
document.getElementById("gambar").addEventListener("change",function(){

    const file=this.files[0];

    if(file){

        document.getElementById("preview").src=URL.createObjectURL(file);

    }

});