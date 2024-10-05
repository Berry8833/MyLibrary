// Function to fetch weather data from an API
async function getCurrentWeather(cityName) {
    // Replace with actual API call (you can use OpenWeather API)
    const apiKey = '83ac9345e5cc138db5e819c64015bd0f'; // Insert your API Key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

async function getFutureWeather(cityName) {
    // Replace with actual API call for 5-day forecast
    const apiKey = '83ac9345e5cc138db5e819c64015bd0f'; // Insert your API Key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Display current weather information
function displayWeather(cityName, currentWeather, futureWeather) {
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
    displayUVIndex(currentWeather.uvi); // UV Index

    // Display 5-day forecast
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';
    for (let i = 0; i < futureWeather.list.length; i += 8) { // Skip to next day's forecast
        const day = futureWeather.list[i];
        const forecastDiv = document.createElement('div');
        forecastDiv.innerHTML = `
            <p>Date: ${new Date(day.dt_txt).toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather Icon">
            <p>Temperature: ${day.main.temp}°C</p>
            <p>Wind Speed: ${day.wind.speed} m/s</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;
        forecastElement.appendChild(forecastDiv);
    }
}

// Add city to search history
function addToSearchHistory(cityName) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = cityName;
    historyItem.addEventListener('click', () => {
        onCityHistoryClick(cityName);
    });
    historyList.appendChild(historyItem);
}

// Display UV Index with color
function displayUVIndex(uvIndex) {
    const uvElement = document.getElementById('uvIndex');
    let uvClass;
    if (uvIndex <= 2) {
        uvClass = "favorable";
    } else if (uvIndex <= 5) {
        uvClass = "moderate";
    } else {
        uvClass = "severe";
    }
    uvElement.className = uvClass;
    uvElement.textContent = `UV Index: ${uvIndex}`;
}

// Function to fetch current weather data from the OpenWeather API
async function getCurrentWeather(cityName) {
    const apiKey = '83ac9345e5cc138db5e819c64015bd0f'; // Insert your API Key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    const data = await response.json();
    return data;
}

// Function to fetch future weather forecast data
async function getFutureWeather(cityName) {
    const apiKey = '83ac9345e5cc138db5e819c64015bd0f'; // Insert your API Key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    const data = await response.json();
    return data;
}

// Function to display current and future weather information
function displayWeather(cityName, currentWeather, futureWeather) {
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('date').textContent = new Date().toLocaleDateString();
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `Temperature: ${currentWeather.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${currentWeather.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${currentWeather.wind.speed} m/s`;
    displayUVIndex(currentWeather.uvi); // Display UV Index

    // Display 5-day forecast
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = ''; // Clear previous forecasts
    for (let i = 0; i < futureWeather.list.length; i += 8) { // Skip to next day's forecast
        const day = futureWeather.list[i];
        const forecastDiv = document.createElement('div');
        forecastDiv.innerHTML = `
            <p>Date: ${new Date(day.dt_txt).toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather Icon">
            <p>Temperature: ${day.main.temp}°C</p>
            <p>Wind Speed: ${day.wind.speed} m/s</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;
        forecastElement.appendChild(forecastDiv);
    }
}

// Function to add searched city to the search history
function addToSearchHistory(cityName) {
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.textContent = cityName;
    historyItem.addEventListener('click', () => {
        onCityHistoryClick(cityName);
    });
    historyList.appendChild(historyItem);
}

// Function to display UV Index with color coding
function displayUVIndex(uvIndex) {
    const uvElement = document.getElementById('uvIndex');
    let uvClass;
    if (uvIndex <= 2) {
        uvClass = "favorable";
    } else if (uvIndex <= 5) {
        uvClass = "moderate";
    } else {
        uvClass = "severe";
    }
    uvElement.className = uvClass;
    uvElement.textContent = `UV Index: ${uvIndex}`;
}

// Function to handle city click from search history
async function onCityHistoryClick(cityName) {
    try {
        const currentWeather = await getCurrentWeather(cityName);
        const futureWeather = await getFutureWeather(cityName);
        displayWeather(cityName, currentWeather, futureWeather);
    } catch (error) {
        alert(error.message);
    }
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', async () => {
    const cityName = document.getElementById('cityInput').value.trim();
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const currentWeather = await getCurrentWeather(cityName);
        const futureWeather = await getFutureWeather(cityName);
        displayWeather(cityName, currentWeather, futureWeather);
        addToSearchHistory(cityName);
    } catch (error) {
        alert(error.message);
    }
});
