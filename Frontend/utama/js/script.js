window.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
    navbarEffect();
    smoothScroll();
});

// =========================
// LOAD PORTFOLIO
// =========================

async function loadPortfolio() {

    try {

        const response = await fetch(API_URL + "/portfolio");

        const data = await response.json();

        console.log(data);

        tampilHero(data.profile);
        tampilAbout(data.profile);
        tampilSkills(data.skills);
        tampilExperiences(data.experiences);
        tampilProjects(data.projects);

    } catch (error) {

        console.error(error);

    }

}

// =========================
// HERO
// =========================

function tampilHero(profile) {

    document.getElementById("hero-content").innerHTML = `

        <h1>Hi, I'm <span style="color:#38bdf8">${profile.nama}</span></h1>

        <p>${profile.deskripsi}</p>

    `;

}

// =========================
// ABOUT
// =========================

function tampilAbout(profile) {

    document.getElementById("about-content").innerHTML = `

        <h2>${profile.nama}</h2>

        <br>

        <p>${profile.deskripsi}</p>

        <br>

        <p><strong>Email :</strong> ${profile.email}</p>

        <p><strong>Telepon :</strong> ${profile.telepon}</p>

        <p><strong>Alamat :</strong> ${profile.alamat}</p>

    `;

    const foto = document.getElementById("profile-photo");

    foto.src = profile.foto;

}

// =========================
// SKILLS
// =========================

function tampilSkills(skills) {

    let html = "";

    skills.forEach(skill => {

        html += `

        <div class="card">

            <h3>${skill.nama_skill}</h3>

            <br>

            <p>${skill.level_skill}</p>

        </div>

        `;

    });

    document.getElementById("skills-container").innerHTML = html;

}

// =========================
// EXPERIENCE
// =========================

function tampilExperiences(experiences) {

    let html = "";

    experiences.forEach(exp => {

        html += `

        <div class="card">

            <h2>${exp.posisi}</h2>

            <br>

            <h4>${exp.perusahaan}</h4>

            <br>

            <small>

                ${formatTanggal(exp.tanggal_mulai)}

                -

                ${formatTanggal(exp.tanggal_selesai)}

            </small>

            <br><br>

            <p>${exp.deskripsi}</p>

        </div>

        `;

    });

    document.getElementById("experiences-container").innerHTML = html;

}

// =========================
// PROJECT
// =========================

function tampilProjects(projects) {

    let html = "";

    projects.forEach(project => {

        html += `

        <div class="card">

            <img src="${project.gambar}" alt="">

            <h3>${project.nama_proyek}</h3>

            <br>

            <p>${project.deskripsi}</p>

            <br>

            <a href="${project.github_link}" target="_blank">

                Github

            </a>

            <a href="${project.demo_link}" target="_blank">

                Demo

            </a>

        </div>

        `;

    });

    document.getElementById("projects-container").innerHTML = html;

}

// =========================
// FORMAT TANGGAL
// =========================

function formatTanggal(tanggal){

    if(!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID",{

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

// =========================
// NAVBAR SCROLL
// =========================

function navbarEffect(){

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            navbar.style.background="#020617";

            navbar.style.boxShadow="0 10px 25px rgba(0,0,0,.4)";

        }

        else{

            navbar.style.background="rgba(15,23,42,.75)";

            navbar.style.boxShadow="none";

        }

    });

}

// =========================
// SMOOTH SCROLL
// =========================

function smoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const tujuan=document.querySelector(this.getAttribute("href"));

            tujuan.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

// =========================
// REVEAL ANIMATION
// =========================

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity=1;

            entry.target.style.transform="translateY(0)";

        }

    });

});

window.addEventListener("load",()=>{

    document.querySelectorAll("section,.card").forEach(el=>{

        el.style.opacity=0;

        el.style.transform="translateY(40px)";

        el.style.transition=".7s";

        observer.observe(el);

    });

});

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const nama = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const pesan = document.getElementById("contactMessage").value;

        try{

            const response = await fetch(API_URL + "/contact",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    nama:nama,
                    email:email,
                    pesan:pesan

                })

            });

            const result = await response.json();

            alert(result.message || result.error);

            if(response.ok){

                contactForm.reset();

            }

        }

        catch(error){

            console.error(error);

            alert("Gagal mengirim pesan.");

        }

    });

}