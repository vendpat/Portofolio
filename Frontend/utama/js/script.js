window.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
    navbarEffect();
    smoothScroll();
});

/* =========================
DATA STATIS (GITHUB PAGES)
========================= */

async function loadPortfolio(){

const data={

profile:{
nama:"Ivendes Pata Patiallo",
deskripsi:"Mahasiswa Sistem Informasi UKSW",
email:"ivendes@example.com",
telepon:"08xxxxxxxxxx",
alamat:"Salatiga",
foto:"./Frontend/utama/assets/profile.jpg"
},

skills:[
{
nama_skill:"HTML",
level_skill:"Advanced"
},
{
nama_skill:"CSS",
level_skill:"Advanced"
},
{
nama_skill:"Python",
level_skill:"Intermediate"
},
{
nama_skill:"Flask",
level_skill:"Intermediate"
}
],

experiences:[
{
posisi:"Mahasiswa",
perusahaan:"UKSW",
tanggal_mulai:"2024-01-01",
tanggal_selesai:null,
deskripsi:"Mengembangkan aplikasi web dan portfolio."
}
],

projects:[
{
nama_proyek:"Portfolio Website",
deskripsi:"Website portofolio pribadi berbasis Flask.",
gambar:"./Frontend/utama/assets/project1.jpg",
github_link:"https://github.com/vendpat/Portofolio",
demo_link:"#"
}
]

};

tampilHero(data.profile);
tampilAbout(data.profile);
tampilSkills(data.skills);
tampilExperiences(data.experiences);
tampilProjects(data.projects);

}

/* =========================
HERO
========================= */

function tampilHero(profile){

document.getElementById("hero-content").innerHTML=`

<h1>
Hi, I'm
<span style="color:#A67C52">
${profile.nama}
</span>
</h1>

<p>${profile.deskripsi}</p>

`;

}

/* =========================
ABOUT
========================= */

function tampilAbout(profile){

document.getElementById("about-content").innerHTML=`

<h2>${profile.nama}</h2>

<br>

<p>${profile.deskripsi}</p>

<br>

<p><strong>Email :</strong> ${profile.email}</p>

<p><strong>Telepon :</strong> ${profile.telepon}</p>

<p><strong>Alamat :</strong> ${profile.alamat}</p>

`;

document.getElementById("profile-photo").src=
profile.foto;

}

/* =========================
SKILLS
========================= */

function tampilSkills(skills){

document.getElementById(
"skills-container"
).innerHTML=

skills.map(skill=>`

<div class="card">

<h3>${skill.nama_skill}</h3>

<p>${skill.level_skill}</p>

</div>

`).join("");

}

/* =========================
EXPERIENCE
========================= */

function tampilExperiences(exps){

document.getElementById(
"experiences-container"
).innerHTML=

exps.map(exp=>`

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

function tampilProjects(projects){

document.getElementById(
"projects-container"
).innerHTML=

projects.map(project=>`

<div class="card">

<img
src="${project.gambar}"
alt="">

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

<a
href="${project.demo_link}"
target="_blank">

Demo

</a>

</div>

`).join("");

}

/* =========================
FORMAT
========================= */

function formatTanggal(tanggal){

if(!tanggal)
return "Sekarang";

return new Date(
tanggal
).toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric"
}
);

}

/* =========================
NAVBAR
========================= */

function navbarEffect(){

const navbar=
document.querySelector(
".navbar"
);

window.addEventListener(
"scroll",
()=>{

if(
window.scrollY>80
){

navbar.style.background=
"#5A4030";

}

else{

navbar.style.background=
"rgba(245,239,230,.95)";

}

}

);

}

/* =========================
SCROLL
========================= */

function smoothScroll(){

document
.querySelectorAll(
'a[href^="#"]'
)

.forEach(anchor=>{

anchor
.addEventListener(
"click",

function(e){

e.preventDefault();

document
.querySelector(
this.getAttribute(
"href"
)
)

.scrollIntoView({

behavior:
"smooth"

});

}

);

});

}

/* =========================
CONTACT
========================= */

const contactForm=
document.getElementById(
"contactForm"
);

if(contactForm){

contactForm.addEventListener(

"submit",

function(e){

e.preventDefault();

alert(
"Pesan berhasil dikirim!"
);

contactForm.reset();

}

);

}