import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const port = 3001;
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to handle image uploads and send to PlantNet API
app.post('/plant', upload.single('image'), async (req, res) => {
  const file = req.file; // Get the uploaded file
  const apiKey = '2b10AkOcfrRqw7H6bHKHHchZIO';
  const apiURL = 'https://my.plantnet.org/v2/identify?api-key=${apiKey}&organs=flower';

  try {
    const formData = new FormData();
    formData.append('images', fs.createReadStream(file.path));

    const response = await fetch(apiURL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    if (data && data.results && data.results.length > 0) {
      res.json(data.results[0]); // Send the first result back to the client
    } else {
      res.json({ message: 'No plants found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching plant data', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});