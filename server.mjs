import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 4000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to fetch plant data
app.get('/plant', async (req, res) => {
  const plantName = req.query.name; // Get the plant name from the query parameter
  const apiKey = '2b106nRYCUKT6ZLk2DzXFLAe';
  const apiURL = 'https://api.plantapi.com/v1/plants?name=${plantName}&apiKey=${apiKey}';

  try {
    const response = await fetch(apiURL); // Fetch data from the Plant API
    const data = await response.json();

    if (data.length > 0) {
      res.json(data[0]); // Send the first plant data result
    } else {
      res.json({ message: 'No plants found' }); // Handle no results
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plant data', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server running on http://localhost:${port}');
});