document.getElementById('plant-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const plantName = document.getElementById('plant-name').value;

    const response = await fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantName }),
    });

    const data = await response.json();
    document.getElementById('result').innerText = JSON.stringify(data, null, 2);
});