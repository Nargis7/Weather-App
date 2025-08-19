const apiKey = "8537937b2f7db185a6e2f6554b72a455"; // 🔑 Replace with your OpenWeatherMap API key

// // // 🔑 Store your API key (unique for your account, from OpenWeatherMap)
// //  // Replace "YOUR_API_KEY" with your real API key string

// // // 🎯 Add an event listener to the button with id="searchBtn"
// // // When clicked, it will call the getWeather() function
// // document.getElementById("searchBtn").addEventListener("click", getWeather);

// // // 🌦 Define an async function (because we will use "await" to fetch data from API)
// // async function getWeather() {

// //   // 📌 Get the city name entered by the user from the input field (id="cityInput")
// //   // .trim() removes extra spaces before/after the text
// //   const city = document.getElementById("cityInput").value.trim();

// //   // 📌 Get a reference to the div where we want to show results (id="weatherResult")
// //   const resultDiv = document.getElementById("weatherResult");

// //   // ❌ If the user didn't type anything, show a warning message and stop the function
// //   if (!city) {
// //     resultDiv.innerHTML = `<p class="text-red-500">⚠️ Please enter a city name</p>`;
// //     return; // stop further execution
// //   }

// //   // 🌍 Build the API URL with the city name, API key, and metric units (Celsius)
// //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// //   try {
// //     // 🌐 Fetch data from the API (this returns a response object)
// //     const res = await fetch(url);

// //     // ❌ If response is not OK (e.g., wrong city name), throw an error
// //     if (!res.ok) throw new Error("❌ City not found");

// //     // ✅ Convert the response into JSON format (JavaScript object)
// //     const data = await res.json();

// //     // 🎨 Insert weather details into the resultDiv (using Tailwind classes for styling)
// //     resultDiv.innerHTML = `
// //       <h2 class="text-xl font-semibold">${data.name}, ${data.sys.country}</h2> 
// //       <!-- City name + country code -->

// //       <p class="capitalize">${data.weather[0].description}</p>
// //       <!-- Weather description (clear sky, rain, etc.) -->

// //       <div class="text-4xl font-bold my-4">${Math.round(data.main.temp)}°C</div>
// //       <!-- Current temperature (rounded to nearest integer) -->

// //       <div class="flex justify-between text-gray-600">
// //         <p>💧 Humidity: ${data.main.humidity}%</p>   <!-- Humidity -->
// //         <p>🌬 Wind: ${data.wind.speed} m/s</p>      <!-- Wind speed -->
// //       </div>
// //     `;
// //   } catch (error) {
// //     // 🚨 If any error happens (wrong city, network issue), show the error message in red
// //     resultDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
// //   }
// // }
// // const apiKey = "YOUR_API_KEY"; // replace with your OpenWeatherMap key
// // const apiKey = "YOUR_API_KEY"; // replace with your OpenWeatherMap API Key
// const searchBtn = document.getElementById("searchBtn");
// const cityInput = document.getElementById("cityInput");
// const weatherResult = document.getElementById("weatherResult");
// const bodyBg = document.getElementById("bodyBg");

// searchBtn.addEventListener("click", () => {
//   const city = cityInput.value.trim();
//   if (city) fetchWeather(city);
// });

// async function fetchWeather(city) {
//   try {
//     const res = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//     );
//     const data = await res.json();

//     if (data.cod !== 200) {
//       weatherResult.innerHTML = `<p class="text-red-200">❌ City not found!</p>`;
//       weatherResult.classList.add("show");
//       return;
//     }

//     const { main, name, sys, weather } = data;
//     const condition = weather[0].main;
//     const icon = getWeatherIcon(condition);

//     weatherResult.innerHTML = `
//       <div class="text-5xl">${icon}</div>
//       <h2 class="text-2xl font-semibold">${name}, ${sys.country}</h2>
//       <p class="text-xl">${main.temp}°C</p>
//       <p class="text-lg">${condition}</p>
//     `;

//     // Fade-in animation
//     weatherResult.classList.add("show");

//     // Dynamic background
//     if (condition === "Clear") {
//       bodyBg.className = "bg-gradient-to-r from-yellow-400 to-orange-500 min-h-screen flex items-center justify-center transition-all duration-700";
//     } else if (condition === "Rain") {
//       bodyBg.className = "bg-gradient-to-r from-gray-600 to-blue-800 min-h-screen flex items-center justify-center transition-all duration-700";
//     } else if (condition === "Clouds") {
//       bodyBg.className = "bg-gradient-to-r from-gray-400 to-gray-600 min-h-screen flex items-center justify-center transition-all duration-700";
//     } else if (condition === "Snow") {
//       bodyBg.className = "bg-gradient-to-r from-blue-200 to-white min-h-screen flex items-center justify-center transition-all duration-700";
//     } else {
//       bodyBg.className = "bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center transition-all duration-700";
//     }

//   } catch (error) {
//     weatherResult.innerHTML = `<p class="text-red-200">⚠️ Error fetching data!</p>`;
//     weatherResult.classList.add("show");
//   // 
// }
// const apiKey = "YOUR_API_KEY"; // replace with your OpenWeatherMap key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const body = document.body;

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherResult.innerHTML = `<p class="text-red-300">⚠️ Please enter a city</p>`;
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    const desc = data.weather[0].description;

    let icon = "☀️";
    let bg = "from-blue-400 to-indigo-600";

    if (weather.includes("Cloud")) {
      icon = "☁️";
      bg = "from-gray-400 to-gray-700";
    } else if (weather.includes("Rain")) {
      icon = "🌧️";
      bg = "from-blue-600 to-indigo-900";
    } else if (weather.includes("Clear")) {
      icon = "☀️";
      bg = "from-yellow-400 to-orange-500";
    }

    // update background
    body.className = `bg-gradient-to-r ${bg} min-h-screen flex items-center justify-center transition-all duration-700`;

    weatherResult.innerHTML = `
      <div class="weather-info space-y-2">
        <p class="text-5xl icon-animate">${icon}</p>
        <h2 class="text-2xl font-bold">${data.name}, ${data.sys.country}</h2>
        <p class="text-lg">${desc}</p>
        <p class="text-4xl font-extrabold">${temp}°C</p>
      </div>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p class="text-red-300">❌ ${error.message}</p>`;
  }
}
