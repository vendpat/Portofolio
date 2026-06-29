window.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
    navbarEffect();
    smoothScroll();
    contactForm();
});

/* =========================
LOAD DATA DARI FLASK API
========================= */

async function loadPortfolio() {

    try {

        const response = await fetch("/api/portfolio");
        const data = await response.json();

        console.log("DATA API :", data);

        tampilHero(data.profile);
        tampilAbout(data.profile);
        tampilSkills(data.skills);
        tampilExperiences(data.experiences);
        tampilProjects(data.projects);

    } catch (error) {

        console.error(error);

    }

}

/* =========================
HERO
========================= */

function tampilHero(profile) {

    document.getElementById("hero-content").innerHTML = `
        <h1>
            Hi, I'm
            <span style="color:#A67C52">
                ${profile.nama}
            </span>
        </h1>

        <p>${profile.deskripsi}</p>
    `;

    document.getElementById("profile-photo").src = profile.foto;

}

/* =========================
ABOUT
========================= */

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

}

/* =========================
SKILLS
========================= */

function tampilSkills(skills) {

    document.getElementById("skills-container").innerHTML = skills.map(skill => `

        <div class="card">

            <h3>${skill.nama_skill}</h3>

            <p>${skill.level_skill}</p>

        </div>

    `).join("");

}

/* =========================
EXPERIENCE
========================= */

function tampilExperiences(experiences) {

    document.getElementById("experiences-container").innerHTML = experiences.map(exp => `

        <div class="card">

            <h2>${exp.posisi}</h2>

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

    `).join("");

}

/* =========================
PROJECT
========================= */

function tampilProjects(projects) {

    document.getElementById("projects-container").innerHTML = projects.map(project => `

        <div class="card">

            <img
                src="${project.gambar}"
                alt="${project.nama_proyek}"
            >

            <h3>

                ${project.nama_proyek}

            </h3>

            <br>

            <p>

                ${project.deskripsi}

            </p>

            <br>

            <a
                href="${project.github_link}"
                target="_blank">

                Github

            </a>

            &nbsp;

            <a
                href="${project.demo_link}"
                target="_blank">

                Demo

            </a>

        </div>

    `).join("");

}

/* =========================
FORMAT TANGGAL
========================= */

function formatTanggal(tanggal) {

    if (!tanggal) return "Sekarang";

    return new Date(tanggal).toLocaleDateString("id-ID", {

        day: "numeric",
        month: "long",
        year: "numeric"

    });

}

/* =========================
NAVBAR
========================= */

function navbarEffect() {

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.style.background = "#5A4030";

        } else {

            navbar.style.background = "rgba(245,239,230,.95)";

        }

    });

}

/* =========================
SMOOTH SCROLL
========================= */

function smoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/* =========================
CONTACT
========================= */

function contactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Pesan berhasil dikirim!");

        form.reset();

    });

}