
document.getElementById('plant-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const imageFile = document.getElementById('plant-image').files[0];

    // Check if a file has been selected
    if (!imageFile) {
        document.getElementById('result').innerText = 'Please choose an image file.';
        return; // Exit the function if no file is selected
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch('/plant', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Fetched Data:', data);

            if (data.message) {
                document.getElementById('result').innerText = data.message;
            } else {
                document.getElementById('result').innerText = JSON.stringify(data, null, 2);
            }
        } else {
            document.getElementById('result').innerText = 'Error fetching data from the server.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred during the fetch request.';
    }
});
