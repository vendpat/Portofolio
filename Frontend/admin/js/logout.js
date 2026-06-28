function logout() {

    if (!confirm("Yakin ingin logout?")) {
        return;
    }

    // Hapus data login
    localStorage.clear();
    sessionStorage.clear();

    // Kembali ke halaman login
    window.location.href = "/Frontend/admin/login.html";
}