// ====================================
// DASHBOARD.JS
// ====================================

loadDashboard();
loadLatest();


// ====================================
// LOAD DASHBOARD
// ====================================
async function loadDashboard() {

    try {

        const res = await fetch(API_URL + "/admin/dashboard");
        const data = await res.json();

        console.log(data);

        document.getElementById("total-experiences").innerText =
            data.experiences || 0;

        document.getElementById("total-projects").innerText =
            data.projects || 0;

        document.getElementById("total-skills").innerText =
            data.skills || 0;

    }

    catch(err){

        console.error(err);

    }

}



// ====================================
// LOAD DATA TERBARU
// ====================================
async function loadLatest(){

    const tbody=document.getElementById("latest-data");

    tbody.innerHTML="";

    try{

        // EXPERIENCE
        const expRes=await fetch(API_URL+"/admin/experience");
        const expData=await expRes.json();

        let experiences=[];

        if(Array.isArray(expData)){
            experiences=expData;
        }
        else if(expData.data){
            experiences=expData.data;
        }

        experiences.slice(0,3).forEach(item=>{

            tbody.innerHTML+=`
            <tr>
                <td>Experience</td>
                <td>${item.posisi}</td>
            </tr>
            `;

        });


        // PROJECT
        const proRes=await fetch(API_URL+"/admin/projects");
        const projects=await proRes.json();

        projects.slice(0,3).forEach(item=>{

            tbody.innerHTML+=`
            <tr>
                <td>Project</td>
                <td>${item.nama_proyek}</td>
            </tr>
            `;

        });


        // SKILL
        const skillRes=await fetch(API_URL+"/admin/skills");
        const skills=await skillRes.json();

        skills.slice(0,3).forEach(item=>{

            tbody.innerHTML+=`
            <tr>
                <td>Skill</td>
                <td>${item.nama_skill}</td>
            </tr>
            `;

        });

    }

    catch(err){

        console.error(err);

    }

}