require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  // Gets city from user
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    //This allows backend talk to weather API
    const weatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: 'metric'
        }
      }
    );

    

  const data = weatherResponse.data;

    //  Sends response to frontend
    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description, 
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      humidity: data.main.humidity,
      iconCode: data.weather[0].icon,
      lastUpdate: Math.floor(Date.now() / 1000)
    });

  } catch (error) {
    res.status(500).json({ error: 'Could not fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



