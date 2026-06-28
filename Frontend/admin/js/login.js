const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                // Simpan token jika ada
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }

                alert("Login berhasil");

                window.location.href = "dashboard.html";

            } else {

                alert(data.message || "Username atau password salah");

            }

        } catch (error) {

            console.error(error);
            alert("Tidak dapat terhubung ke server");

        }

    });

}