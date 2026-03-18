const API_KEY = 'e8b7c230f2251188d45fcacd04c589a0';

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById('weatherResult').classList.remove('d-none');
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('desc').innerText = data.weather[0].description;
        } else {
            alert("Không tìm thấy thành phố!");
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
    }
}

document.getElementById('searchBtn').onclick = () => {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`;
    fetchWeather(url);
};

document.getElementById('geoBtn').onclick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=vi`;
        fetchWeather(url);
    });
};