  const inputCity = document.querySelector('.input-city');

  function fetchWeatherInfo() {
    const city = inputCity.value.trim();
    if (!city) return alert('Please enter a city');
  
    fetch(`/weather?city=${city}`)
    .then((res => res.json()))
    .then(weatherInfo => {
      if(weatherInfo.error) {
        alert(weatherInfo.error);
        return;
      }
    
       // Extract data from backend
      const {
        city: cityName,
        temperature,
        condition,
        windSpeed,
        feelsLike,
        sunrise,
        sunset,
        humidity,
        iconCode,
        lastUpdate
      } = weatherInfo;

      // Convert timestamps to human-readable
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedTime = new Date(lastUpdate * 1000).toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });

      // Build icon URL if provided
      const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

      document.querySelector('.city-name').textContent = cityName;
      document.querySelector('.temp').textContent = `${temperature}°C`;
      document.querySelector('.description').textContent = condition;
      document.querySelector('.wind-speed').textContent = `WindSpeed: ${windSpeed} m/s`;
      document.querySelector('.weather-icon').src = iconUrl;
      document.querySelector('.last-update').textContent = `Last updated: ${updatedTime}`;
      document.querySelector('.weather-humidity').textContent = `Humidity: ${humidity}%`;
      document.querySelector('.sunrise').textContent = `Sunrise: ${sunriseTime}`;
      document.querySelector('.sunset').textContent = `Sunset: ${sunsetTime}`;
      document.querySelector('.feels-Like').textContent = `Feels like: ${feelsLike}°C`;

      document.querySelector('.input-header').classList.add('hidden');
      document.querySelector('.background').classList.remove('hidden');

    })
  };

document.querySelector('.search-icon-button').addEventListener('click', () => {
  fetchWeatherInfo()
});


inputCity.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    fetchWeatherInfo();
  }
});


