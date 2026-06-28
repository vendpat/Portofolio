async function uploadImage(file) {

    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
        `${API_URL}/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
}