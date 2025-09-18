// weather.js - Dynamic Weather API Integration
// Replace YOUR_API_KEY with your actual OpenWeatherMap API key

const API_KEY = 'YOUR_API_KEY'; // Get from openweathermap.org
const CITY = 'Abidjan';
const COUNTRY = 'CI';

async function fetchWeatherData() {
    try {
        // Current weather API call
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`);
        const currentData = await currentResponse.json();

        // 5-day forecast API call
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`);
        const forecastData = await forecastResponse.json();

        updateWeatherDisplay(currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Fallback display
        document.getElementById('weather-location').textContent = 'Abidjan';
        document.getElementById('weather-description').innerHTML = 'Unable to load weather data';
        document.getElementById('current-temp').textContent = '--°';
    }
}

function updateWeatherDisplay(current, forecast) {
    // Update current weather
    document.getElementById('weather-location').textContent = current.name;
    document.getElementById('current-temp').textContent = `${Math.round(current.main.temp)}°`;

    const weatherDesc = current.weather[0].description;
    const windSpeed = Math.round(current.wind.speed * 3.6); // Convert m/s to km/h
    const humidity = current.main.humidity;

    document.getElementById('weather-description').innerHTML =
        `${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}<span>Wind ${windSpeed}km/h <span class="dot">•</span> Humidity ${humidity}%</span>`;

    // Update 3-day forecast
    updateForecast(forecast);
}

function updateForecast(forecastData) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date().getDay();

    const forecastDays = document.getElementById('forecast-days');
    const forecastHighs = document.getElementById('forecast-highs');
    const forecastLows = document.getElementById('forecast-lows');

    forecastDays.innerHTML = '';
    forecastHighs.innerHTML = '';
    forecastLows.innerHTML = '';

    // Get next 3 days forecast
    const dailyForecasts = {};

    forecastData.list.slice(0, 24).forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                highs: [item.main.temp_max],
                lows: [item.main.temp_min]
            };
        } else {
            dailyForecasts[date].highs.push(item.main.temp_max);
            dailyForecasts[date].lows.push(item.main.temp_min);
        }
    });

    let count = 0;
    for (const date in dailyForecasts) {
        if (count >= 3) break;

        const dayIndex = (today + count + 1) % 7;
        const high = Math.round(Math.max(...dailyForecasts[date].highs));
        const low = Math.round(Math.min(...dailyForecasts[date].lows));

        forecastDays.innerHTML += `<td>${days[dayIndex]}</td>`;
        forecastHighs.innerHTML += `<td>${high}°</td>`;
        forecastLows.innerHTML += `<td>${low}°</td>`;

        count++;
    }
}

// Load weather data when page loads
document.addEventListener('DOMContentLoaded', fetchWeatherData);