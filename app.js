// Application State
const state = {
    theme: localStorage.getItem("weather_theme") || "dark", // "dark" or "light"
    units: localStorage.getItem("weather_units") || "C", // "C" or "F"
    currentCity: JSON.parse(localStorage.getItem("weather_city")) || {
        name: "New Delhi",
        country: "India",
        admin: "Delhi",
        lat: 28.6139,
        lon: 77.2090
    },
    weatherData: null,
    savedCities: JSON.parse(localStorage.getItem("weather_saved")) || [],
    chartInstance: null,
    activeChartTab: "temp", // "temp" or "rain"
    searchTimeout: null,
    weatherCanvas: null
};

// Wind directions array for compass conversion
const COMPASS_SECTORS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

// DOM Elements
const searchInput = document.getElementById("search-input");
const autocompleteResults = document.getElementById("autocomplete-results");
const locateBtn = document.getElementById("locate-btn");
const unitCBtn = document.getElementById("unit-c");
const unitFBtn = document.getElementById("unit-f");
const savedCitiesList = document.getElementById("saved-cities-list");
const mainWeatherIcon = document.getElementById("main-weather-icon");
const currentTemp = document.getElementById("current-temp");
const weatherDescription = document.getElementById("weather-description");
const todayHigh = document.getElementById("today-high");
const todayLow = document.getElementById("today-low");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");
const currentLocation = document.getElementById("current-location");
const hourlyForecastContainer = document.getElementById("hourly-forecast-container");
const dailyForecastList = document.getElementById("daily-forecast-list");
const updateStatus = document.getElementById("update-status");

// Highlight Elements
const uvGaugeFill = document.getElementById("uv-gauge-fill");
const uvVal = document.getElementById("uv-val");
const uvLevel = document.getElementById("uv-level");
const windSpeed = document.getElementById("wind-speed");
const windUnit = document.getElementById("wind-unit");
const compassNeedle = document.getElementById("compass-needle");
const windDirText = document.getElementById("wind-dir-text");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const sunArcProgress = document.getElementById("sun-arc-progress");
const sunArcNode = document.getElementById("sun-arc-node");
const humidityProgress = document.getElementById("humidity-progress");
const humidityVal = document.getElementById("humidity-val");
const humidityDesc = document.getElementById("humidity-desc");
const visibilityVal = document.getElementById("visibility-val");
const visibilityUnit = document.getElementById("visibility-unit");
const visibilityDesc = document.getElementById("visibility-desc");
const pressureVal = document.getElementById("pressure-val");
const pressureUnit = document.getElementById("pressure-unit");
const pressureDesc = document.getElementById("pressure-desc");
const dewPointVal = document.getElementById("dew-point-val");
const dewPointDesc = document.getElementById("dew-point-desc");

// Chart Toggle Buttons
const chartTempBtn = document.getElementById("chart-temp-btn");
const chartRainBtn = document.getElementById("chart-rain-btn");

/* INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Migrate old default city (New York) to New Delhi
    if (state.currentCity && state.currentCity.name === "New York" && state.currentCity.country === "United States") {
        state.currentCity = {
            name: "New Delhi",
            country: "India",
            admin: "Delhi",
            lat: 28.6139,
            lon: 77.2090
        };
        localStorage.setItem("weather_city", JSON.stringify(state.currentCity));
    }

    state.weatherCanvas = new WeatherCanvas("weather-canvas");
    
    // Set initial theme style
    if (state.theme === "light") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }
    renderThemeIcon();

    setupEventListeners();
    renderSavedCities();
    initIndiaExplorer();
    fetchWeatherData(state.currentCity.lat, state.currentCity.lon);
    
    // Set initial unit button active state
    if (state.units === "F") {
        unitCBtn.classList.remove("active");
        unitFBtn.classList.add("active");
    } else {
        unitCBtn.classList.add("active");
        unitFBtn.classList.remove("active");
    }
}

/* EVENT LISTENERS */
function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    // Search Autocomplete with Debounce
    searchInput.addEventListener("input", (e) => {
        clearTimeout(state.searchTimeout);
        const query = e.target.value.trim();
        if (query.length < 2) {
            autocompleteResults.classList.add("hidden");
            return;
        }
        state.searchTimeout = setTimeout(() => {
            fetchGeocoding(query);
        }, 350);
    });

    // Hide search suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !autocompleteResults.contains(e.target)) {
            autocompleteResults.classList.add("hidden");
        }
    });

    // Geolocate Button
    locateBtn.addEventListener("click", handleGeolocation);

    // Units Toggles
    unitCBtn.addEventListener("click", () => setUnits("C"));
    unitFBtn.addEventListener("click", () => setUnits("F"));

    // Chart Tabs
    chartTempBtn.addEventListener("click", () => setChartTab("temp"));
    chartRainBtn.addEventListener("click", () => setChartTab("rain"));
}

/* UNIT SWITCHER */
function setUnits(unit) {
    if (state.units === unit) return;
    state.units = unit;
    localStorage.setItem("weather_units", unit);
    
    if (unit === "C") {
        unitCBtn.classList.add("active");
        unitFBtn.classList.remove("active");
    } else {
        unitFBtn.classList.add("active");
        unitCBtn.classList.remove("active");
    }
    
    if (state.weatherData) {
        updateUI();
    }
}

function setChartTab(tab) {
    if (state.activeChartTab === tab) return;
    state.activeChartTab = tab;
    
    if (tab === "temp") {
        chartTempBtn.classList.add("active");
        chartRainBtn.classList.remove("active");
    } else {
        chartRainBtn.classList.add("active");
        chartTempBtn.classList.remove("active");
    }
    
    if (state.weatherData) {
        renderChart();
    }
}

/* THEME TOGGLE SWITCHER */
function toggleTheme() {
    if (state.theme === "dark") {
        state.theme = "light";
        document.body.classList.add("light-theme");
    } else {
        state.theme = "dark";
        document.body.classList.remove("light-theme");
    }
    localStorage.setItem("weather_theme", state.theme);
    renderThemeIcon();
    
    if (state.weatherData) {
        renderChart();
    }
}

function renderThemeIcon() {
    const iconContainer = document.getElementById("theme-toggle-icon");
    if (!iconContainer) return;
    
    if (state.theme === "light") {
        iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    } else {
        iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    }
}

/* API: GEOCODING */
async function fetchGeocoding(query) {
    try {
        const queryLower = query.toLowerCase();
        const localMatches = [];

        // 1. Search in local INDIA_STATES_DATA first
        if (typeof INDIA_STATES_DATA !== 'undefined') {
            INDIA_STATES_DATA.forEach(stateObj => {
                // Check state name match
                if (stateObj.state.toLowerCase().includes(queryLower)) {
                    localMatches.push({
                        name: stateObj.state,
                        country: "India",
                        admin1: stateObj.type === "UT" ? "Union Territory" : "State",
                        admin2: "",
                        latitude: stateObj.lat,
                        longitude: stateObj.lon,
                        isLocal: true,
                        localType: stateObj.type
                    });
                }
                
                // Check capital name match
                if (stateObj.capital.toLowerCase().includes(queryLower)) {
                    const capCityObj = stateObj.cities.find(c => c.name.toLowerCase() === stateObj.capital.toLowerCase());
                    localMatches.push({
                        name: stateObj.capital,
                        country: "India",
                        admin1: stateObj.state,
                        admin2: "Capital City",
                        latitude: capCityObj ? capCityObj.lat : stateObj.lat,
                        longitude: capCityObj ? capCityObj.lon : stateObj.lon,
                        isLocal: true,
                        localType: "Capital"
                    });
                }

                // Check other cities/towns match
                stateObj.cities.forEach(city => {
                    // Skip if it's the capital (handled above) to prevent duplication
                    if (city.name.toLowerCase() === stateObj.capital.toLowerCase()) return;
                    
                    if (city.name.toLowerCase().includes(queryLower)) {
                        localMatches.push({
                            name: city.name,
                            country: "India",
                            admin1: stateObj.state,
                            admin2: "Town/City",
                            latitude: city.lat,
                            longitude: city.lon,
                            isLocal: true,
                            localType: "City"
                        });
                    }
                });
            });
        }

        // Fetch from Open-Meteo Geocoding API (fast, reliable for famous cities)
        const openMeteoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
        const openMeteoPromise = fetch(openMeteoUrl)
            .then(res => {
                if (!res.ok) throw new Error("Open-Meteo response not OK");
                return res.json();
            })
            .then(data => data.results || [])
            .catch(err => {
                console.warn("Open-Meteo search failed:", err);
                return [];
            });

        // Fetch from Nominatim API (extremely comprehensive, includes all small cities/villages)
        // Add email to comply with usage policy and prevent rate limiting / blocking
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1&accept-language=en&email=altitude-weather-app@outlook.com`;
        const nominatimPromise = fetch(nominatimUrl)
            .then(res => {
                if (!res.ok) throw new Error("Nominatim response not OK");
                return res.json();
            })
            .catch(err => {
                console.warn("Nominatim search failed:", err);
                return [];
            });

        // Run both fetches concurrently
        const [openMeteoResults, nominatimResults] = await Promise.all([openMeteoPromise, nominatimPromise]);

        const combinedResults = [...localMatches];

        // Add Open-Meteo results if not duplicate of local matches
        openMeteoResults.forEach(city => {
            const latitude = city.latitude;
            const longitude = city.longitude;
            
            const isDuplicate = combinedResults.some(existing => {
                const latDiff = Math.abs(existing.latitude - latitude);
                const lonDiff = Math.abs(existing.longitude - longitude);
                return latDiff < 0.05 && lonDiff < 0.05;
            });
            
            if (!isDuplicate) {
                combinedResults.push({
                    name: city.name,
                    country: city.country || "",
                    admin1: city.admin1 || "",
                    admin2: city.admin2 || "",
                    latitude: city.latitude,
                    longitude: city.longitude,
                    source: "open-meteo"
                });
            }
        });

        // Add Nominatim results if not duplicate
        nominatimResults.forEach(item => {
            const addr = item.address || {};
            const name = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || addr.municipality || item.name || addr.road || "Unknown";
            const country = addr.country || "";
            const admin1 = addr.state || addr.region || "";
            const admin2 = addr.county || addr.state_district || "";
            
            const latitude = parseFloat(item.lat);
            const longitude = parseFloat(item.lon);

            const isDuplicate = combinedResults.some(existing => {
                const latDiff = Math.abs(existing.latitude - latitude);
                const lonDiff = Math.abs(existing.longitude - longitude);
                const namesSimilar = existing.name.toLowerCase().includes(name.toLowerCase()) || 
                                     name.toLowerCase().includes(existing.name.toLowerCase());
                return latDiff < 0.05 && lonDiff < 0.05 && namesSimilar;
            });

            if (!isDuplicate) {
                combinedResults.push({
                    name: name,
                    country: country,
                    admin1: admin1,
                    admin2: admin2,
                    latitude: latitude,
                    longitude: longitude,
                    source: "nominatim"
                });
            }
        });

        // Sort results to prioritize local database matches and Indian locations
        combinedResults.sort((a, b) => {
            if (a.isLocal && !b.isLocal) return -1;
            if (!a.isLocal && b.isLocal) return 1;

            const aIsIndia = a.country && a.country.toLowerCase() === "india";
            const bIsIndia = b.country && b.country.toLowerCase() === "india";
            if (aIsIndia && !bIsIndia) return -1;
            if (!aIsIndia && bIsIndia) return 1;
            return 0;
        });

        if (combinedResults.length > 0) {
            renderAutocomplete(combinedResults);
        } else {
            renderNoLocationsFound();
        }
    } catch (err) {
        console.error("Geocoding fetch failed completely:", err);
        renderNoLocationsFound();
    }
}

function renderNoLocationsFound() {
    autocompleteResults.innerHTML = `
        <div class="autocomplete-item" style="cursor: default; pointer-events: none;">
            <svg class="suggestion-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--danger-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 1;">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div class="suggestion-text">
                <span class="city-name" style="font-weight: 500; color: var(--text-secondary);">No locations found</span>
                <span class="city-admin" style="font-size: 11px;">Try checking spelling or try another name</span>
            </div>
        </div>
    `;
    autocompleteResults.classList.remove("hidden");
}

function renderAutocomplete(cities) {
    autocompleteResults.innerHTML = "";
    cities.forEach(city => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        
        const adminText = [city.admin1, city.admin2].filter(Boolean).join(" // ");
        
        let badgeHtml = "";
        if (city.isLocal) {
            badgeHtml = `<span class="india-badge">${city.localType}</span>`;
        }
        
        item.innerHTML = `
            <svg class="suggestion-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
            <div class="suggestion-text">
                <span class="city-name">${city.name}${city.country ? `, <span class="country-name">${city.country}</span>` : ""}${badgeHtml}</span>
                <span class="city-admin">${adminText || "Region unavailable"}</span>
            </div>
        `;
        
        item.addEventListener("click", () => {
            selectCity({
                name: city.name,
                country: city.country || "India",
                admin: city.admin1 || "",
                lat: city.latitude,
                lon: city.longitude
            });
            autocompleteResults.classList.add("hidden");
            searchInput.value = "";
        });
        
        autocompleteResults.appendChild(item);
    });
    autocompleteResults.classList.remove("hidden");
}

function selectCity(cityObj) {
    state.currentCity = cityObj;
    localStorage.setItem("weather_city", JSON.stringify(cityObj));
    
    // Save to recents/saved history
    saveToHistory(cityObj);
    
    fetchWeatherData(cityObj.lat, cityObj.lon);
}

/* GEOLOCATION HANDLER */
function handleGeolocation() {
    locateBtn.disabled = true;
    locateBtn.style.opacity = "0.5";
    
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        locateBtn.disabled = false;
        locateBtn.style.opacity = "1";
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Reverse geocode to find friendly name using open-meteo's parameters or a standard fallback
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);
                const data = await res.json();
                
                const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Current Location";
                const country = data.address.country || "";
                
                selectCity({
                    name: city,
                    country: country,
                    admin: data.address.state || "",
                    lat: lat,
                    lon: lon
                });
            } catch (e) {
                // If reverse geocoding fails, load coordinates with generic name
                selectCity({
                    name: "GPS Location",
                    country: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
                    admin: "",
                    lat: lat,
                    lon: lon
                });
            } finally {
                locateBtn.disabled = false;
                locateBtn.style.opacity = "1";
            }
        },
        (error) => {
            console.error("GPS position retrieval failed:", error);
            alert("Unable to retrieve location. Please check browser permissions.");
            locateBtn.disabled = false;
            locateBtn.style.opacity = "1";
        },
        { timeout: 10000 }
    );
}

/* RECENT SEARCHES HISTORY */
function saveToHistory(cityObj) {
    // Keep list unique and limited to 4 items
    let saved = state.savedCities.filter(c => c.lat.toFixed(3) !== cityObj.lat.toFixed(3) || c.lon.toFixed(3) !== cityObj.lon.toFixed(3));
    saved.unshift(cityObj);
    saved = saved.slice(0, 4);
    
    state.savedCities = saved;
    localStorage.setItem("weather_saved", JSON.stringify(saved));
    renderSavedCities();
}

function deleteSavedCity(index, event) {
    event.stopPropagation(); // Avoid loading the city when deleting
    state.savedCities.splice(index, 1);
    localStorage.setItem("weather_saved", JSON.stringify(state.savedCities));
    renderSavedCities();
}

function renderSavedCities() {
    savedCitiesList.innerHTML = "";
    if (state.savedCities.length === 0) {
        savedCitiesList.innerHTML = `<span style="font-size:12px; color:var(--text-muted)">No recent searches</span>`;
        return;
    }
    
    state.savedCities.forEach((city, index) => {
        const chip = document.createElement("div");
        chip.className = "saved-city-chip";
        chip.innerHTML = `
            <span>${city.name}</span>
            <span class="delete-chip" title="Remove">&times;</span>
        `;
        
        chip.addEventListener("click", () => {
            selectCity(city);
        });
        
        chip.querySelector(".delete-chip").addEventListener("click", (e) => {
            deleteSavedCity(index, e);
        });
        
        savedCitiesList.appendChild(chip);
    });
}

/* FETCH WEATHER DATA */
async function fetchWeatherData(lat, lon) {
    try {
        updateStatus.textContent = "Loading weather info...";
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather request failed.");
        const data = await res.json();
        
        state.weatherData = data;
        updateUI();
        
        const now = new Date();
        updateStatus.textContent = `Updated at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch (err) {
        console.error("Weather data fetch failed:", err);
        updateStatus.textContent = "Failed to update weather details";
    }
}

/* UPDATE ALL UI SECTIONS */
function updateUI() {
    const data = state.weatherData;
    if (!data) return;
    
    const current = data.current;
    const daily = data.daily;
    const isDay = current.is_day;
    
    // 1. Theme and Description Setup
    const weatherInfo = getWeatherDetails(current.weather_code, isDay);
    
    // Set dynamic body gradient background
    document.body.className = weatherInfo.bgClass;
    
    // Update particles canvas weather theme
    if (state.weatherCanvas) {
        state.weatherCanvas.setWeather(weatherInfo.bgClass);
    }
    
    // Set Main Weather SVG
    mainWeatherIcon.innerHTML = weatherInfo.iconHtml;
    
    // Temperature and description formatting
    const tempC = current.temperature_2m;
    const feelsLikeC = current.apparent_temperature;
    
    currentTemp.textContent = convertTempVal(tempC);
    weatherDescription.textContent = weatherInfo.description;
    
    // Min/Max for today
    todayHigh.textContent = `H: ${convertTempText(daily.temperature_2m_max[0])}`;
    todayLow.textContent = `L: ${convertTempText(daily.temperature_2m_min[0])}`;
    
    // Location name
    const stateCountry = [state.currentCity.admin, state.currentCity.country].filter(Boolean).join(", ");
    currentLocation.textContent = `${state.currentCity.name}${stateCountry ? `, ${stateCountry}` : ""}`;
    
    // Date & Time block (using device timezone offset/Open-Meteo local timezone)
    updateDateTimeDisplay(data.timezone);
    
    // 2. Highlights Cards Update
    
    // UV Index
    const uv = daily.uv_index_max[0] || 0;
    uvVal.textContent = uv.toFixed(1);
    uvGaugeFill.style.width = `${Math.min((uv / 12) * 100, 100)}%`;
    uvLevel.textContent = getUVLevelDescription(uv);
    
    // Wind Speed and Compass
    const windSpeedKmh = current.wind_speed_10m;
    const windDirectionDeg = current.wind_direction_10m;
    
    if (state.units === "F") {
        const mph = windSpeedKmh * 0.621371;
        windSpeed.textContent = Math.round(mph);
        windUnit.textContent = "mph";
    } else {
        windSpeed.textContent = Math.round(windSpeedKmh);
        windUnit.textContent = "km/h";
    }
    
    compassNeedle.style.transform = `rotate(${windDirectionDeg}deg)`;
    windDirText.textContent = `${getWindDirectionText(windDirectionDeg)} (${windDirectionDeg}°)`;
    
    // Sunrise and Sunset
    const sunriseStr = daily.sunrise[0];
    const sunsetStr = daily.sunset[0];
    const rawSunrise = new Date(sunriseStr);
    const rawSunset = new Date(sunsetStr);
    
    sunriseTime.textContent = rawSunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    sunsetTime.textContent = rawSunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    updateSunArcProgress(rawSunrise, rawSunset);
    
    // Humidity
    const humidity = current.relative_humidity_2m;
    humidityVal.textContent = humidity;
    humidityProgress.style.strokeDasharray = `${humidity}, 100`;
    humidityDesc.textContent = getHumidityDescription(humidity);
    
    // Visibility
    const visibilityMeters = current.cloud_cover; // Open-Meteo doesn't support visibility directly for free, we approximate via cloud cover or general mapping, or set realistic indices. Actually, let's calculate general visibility based on weather conditions.
    const calculatedVisibilityKm = getApproximateVisibility(current.weather_code);
    
    if (state.units === "F") {
        visibilityVal.textContent = Math.round(calculatedVisibilityKm * 0.621371);
        visibilityUnit.textContent = "mi";
    } else {
        visibilityVal.textContent = calculatedVisibilityKm;
        visibilityUnit.textContent = "km";
    }
    visibilityDesc.textContent = getVisibilityDescription(calculatedVisibilityKm);
    
    // Air Pressure
    const pressureHpa = current.pressure_msl;
    if (state.units === "F") {
        const inHg = pressureHpa * 0.02953;
        pressureVal.textContent = inHg.toFixed(2);
        pressureUnit.textContent = "inHg";
    } else {
        pressureVal.textContent = Math.round(pressureHpa);
        pressureUnit.textContent = "hPa";
    }
    pressureDesc.textContent = getPressureDescription(pressureHpa);
    
    // Dew Point
    const dewPointC = data.hourly.dew_point_2m[getCurrentHourIndex(data.hourly.time)];
    dewPointVal.textContent = convertTempText(dewPointC);
    dewPointDesc.textContent = getDewPointDescription(dewPointC);
    
    // 3. Hourly Forecast Row (Next 24 Hours)
    renderHourlyForecast();
    
    // 4. 7-Day Forecast Grid
    renderDailyForecast();
    
    // 5. Build Charts
    renderChart();
    
    // Sync India Explorer UI states
    syncIndiaExplorerUI();
}

/* CONVERSION HELPERS */
function convertTempVal(tempC) {
    if (state.units === "F") {
        return Math.round((tempC * 9/5) + 32);
    }
    return Math.round(tempC);
}

function convertTempText(tempC) {
    return `${convertTempVal(tempC)}°`;
}

function updateDateTimeDisplay(timezone) {
    // Format timezone local time
    try {
        const localDate = new Date();
        const optionsDate = { weekday: 'short', day: '2-digit', month: 'short', timeZone: timezone };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timezone };
        
        currentDate.textContent = localDate.toLocaleDateString('en-US', optionsDate);
        currentTime.textContent = localDate.toLocaleTimeString('en-US', optionsTime);
    } catch (e) {
        // Fallback to local system time
        const localDate = new Date();
        currentDate.textContent = localDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
        currentTime.textContent = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
}

function getCurrentHourIndex(timeArray) {
    const nowLocal = new Date();
    // Parse timeArray dates and locate closest index matching local time hour
    const nowIsoHour = new Date(nowLocal.getFullYear(), nowLocal.getMonth(), nowLocal.getDate(), nowLocal.getHours()).getTime();
    
    let closestIndex = 0;
    let minDiff = Infinity;
    
    timeArray.forEach((timeStr, idx) => {
        const diff = Math.abs(new Date(timeStr).getTime() - nowIsoHour);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
        }
    });
    
    return closestIndex;
}

/* WIND COMPASS MATH */
function getWindDirectionText(deg) {
    const index = Math.round(((deg % 360) / 22.5)) % 16;
    return COMPASS_SECTORS[index];
}

/* SUNRISE / SUNSET GRAPHIC */
function updateSunArcProgress(sunrise, sunset) {
    const now = new Date();
    
    const sunriseMin = sunrise.getHours() * 60 + sunrise.getMinutes();
    const sunsetMin = sunset.getHours() * 60 + sunset.getMinutes();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    
    if (nowMin >= sunriseMin && nowMin <= sunsetMin) {
        const ratio = (nowMin - sunriseMin) / (sunsetMin - sunriseMin);
        
        // Arc circumference math for stroke-dashoffset (approx 141.4)
        const circumference = 141.4;
        const offset = circumference * (1 - ratio);
        sunArcProgress.setAttribute("stroke-dashoffset", offset);
        
        // Node positioning along coordinates
        const cx = 5 + 90 * ratio;
        const cy = 45 - 40 * Math.sin(Math.PI * ratio);
        
        sunArcNode.setAttribute("cx", cx);
        sunArcNode.setAttribute("cy", cy);
        sunArcNode.style.display = "block";
    } else {
        // Sun set or before rise
        sunArcProgress.setAttribute("stroke-dashoffset", 141.4);
        sunArcNode.style.display = "none";
    }
}

/* TEXT METRIC SUMMARIES */
function getUVLevelDescription(uv) {
    if (uv <= 2.9) return "Low risk. Safe to enjoy outdoors.";
    if (uv <= 5.9) return "Moderate risk. Wear sunscreen & sunglasses.";
    if (uv <= 7.9) return "High risk. Protection required.";
    if (uv <= 10.9) return "Very high risk. Stay indoors during midday.";
    return "Extreme risk. Avoid direct sunlight.";
}

function getHumidityDescription(humidity) {
    if (humidity < 30) return "Dry air. Hydration is key.";
    if (humidity < 60) return "Optimal humidity. Very comfortable.";
    if (humidity < 80) return "Sticky environment. High moisture levels.";
    return "Extremely damp. Feels uncomfortable.";
}

function getApproximateVisibility(code) {
    // Rough estimation based on weather codes
    if ([0, 1].includes(code)) return 10; // Clear
    if ([2, 3].includes(code)) return 8; // Cloud/Overcast
    if ([45, 48].includes(code)) return 1; // Fog
    if ([51, 53, 55, 56, 57].includes(code)) return 6; // Drizzle
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 4; // Rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 3; // Snow
    return 2; // Storm
}

function getVisibilityDescription(km) {
    if (km >= 9) return "Excellent vision index.";
    if (km >= 5) return "Good visibility conditions.";
    if (km >= 2) return "Moderate haze or mist.";
    return "Poor visual index. Exercise caution.";
}

function getPressureDescription(hpa) {
    if (hpa > 1022) return "High pressure. Clear, calm weather.";
    if (hpa >= 1009) return "Standard barometric conditions.";
    return "Low pressure system. Clouds & rain possible.";
}

function getDewPointDescription(tempC) {
    if (tempC < 10) return "Dry air. Dew won't easily form.";
    if (tempC <= 16) return "Comfortable dew index.";
    if (tempC <= 21) return "Sticky air. Feels muggy.";
    return "Oppressive humidity. High dew condensation.";
}

/* RENDER: HOURLY FORECAST LIST */
function renderHourlyForecast() {
    hourlyForecastContainer.innerHTML = "";
    const hourly = state.weatherData.hourly;
    const startIndex = getCurrentHourIndex(hourly.time);
    
    // Render next 24 hours
    for (let i = startIndex; i < startIndex + 24 && i < hourly.time.length; i++) {
        const timeVal = new Date(hourly.time[i]);
        const tempVal = hourly.temperature_2m[i];
        const pop = hourly.precipitation_probability[i];
        const code = hourly.weather_code[i];
        
        // Approximate day/night for hourly icons
        const hour = timeVal.getHours();
        const isDay = (hour >= 6 && hour < 18) ? 1 : 0;
        const weatherInfo = getWeatherDetails(code, isDay);
        
        const card = document.createElement("div");
        card.className = "hourly-card";
        
        const timeString = timeVal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        
        card.innerHTML = `
            <span class="hourly-time">${timeString}</span>
            ${weatherInfo.iconHtml}
            <span class="hourly-temp">${convertTempText(tempVal)}</span>
            ${pop > 10 ? `
                <span class="hourly-pop">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style="width:10px;height:10px;margin-bottom:0;"><path d="M12 2s-8 6.78-8 11.5A7.5 7.5 0 0 0 12 21a7.5 7.5 0 0 0 7.5-7.5C19.5 8.78 12 2 12 2z"/></svg>
                    ${pop}%
                </span>
            ` : ""}
        `;
        
        hourlyForecastContainer.appendChild(card);
    }
}

/* RENDER: DAILY FORECAST LIST */
function renderDailyForecast() {
    dailyForecastList.innerHTML = "";
    const daily = state.weatherData.daily;
    
    // Calculate global weekly min and max to size the sliders correctly
    let globalMin = Infinity;
    let globalMax = -Infinity;
    for (let i = 0; i < 7; i++) {
        if (daily.temperature_2m_min[i] < globalMin) globalMin = daily.temperature_2m_min[i];
        if (daily.temperature_2m_max[i] > globalMax) globalMax = daily.temperature_2m_max[i];
    }
    
    const globalRange = globalMax - globalMin || 1; // avoid divide by zero
    
    // Render next 7 days
    for (let i = 0; i < 7; i++) {
        const dateVal = new Date(daily.time[i]);
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const code = daily.weather_code[i];
        
        const dayName = i === 0 ? "Today" : dateVal.toLocaleDateString('en-US', { weekday: 'short' });
        const weatherInfo = getWeatherDetails(code, 1); // Assume daytime icon
        
        // Compute percentages for range bar fill
        const leftPercent = ((minTemp - globalMin) / globalRange) * 100;
        const rightPercent = 100 - (((maxTemp - globalMin) / globalRange) * 100);
        
        // Draw today's indicator dot if current hour is loaded
        let currentDotHtml = "";
        if (i === 0 && state.weatherData.current) {
            const currentTempC = state.weatherData.current.temperature_2m;
            const currentDotPercent = ((currentTempC - minTemp) / (maxTemp - minTemp || 1)) * 100;
            const clampedPercent = Math.max(0, Math.min(100, currentDotPercent));
            currentDotHtml = `<div class="temp-range-current-dot" style="left: ${clampedPercent}%;"></div>`;
        }
        
        const row = document.createElement("div");
        row.className = "daily-row";
        row.innerHTML = `
            <span class="daily-day">${dayName}</span>
            <div class="daily-icon-desc">
                ${weatherInfo.iconHtml}
                <span class="daily-desc-text">${weatherInfo.description}</span>
            </div>
            <div class="daily-temp-bar-container">
                <span class="daily-temp-min">${convertTempText(minTemp)}</span>
                <div class="temp-range-bar-track">
                    <div class="temp-range-bar-fill" style="left: ${leftPercent}%; right: ${rightPercent}%;">
                        ${currentDotHtml}
                    </div>
                </div>
                <span class="daily-temp-max">${convertTempText(maxTemp)}</span>
            </div>
        `;
        
        dailyForecastList.appendChild(row);
    }
}

/* TREND CHART GENERATION (CHART.JS) */
function renderChart() {
    const ctx = document.getElementById("weatherChart").getContext("2d");
    const hourly = state.weatherData.hourly;
    const startIndex = getCurrentHourIndex(hourly.time);
    
    const sliceCount = 24;
    const timeSlice = hourly.time.slice(startIndex, startIndex + sliceCount);
    
    // Format times for X axis labels
    const labels = timeSlice.map(t => {
        const date = new Date(t);
        return date.toLocaleTimeString([], { hour: '2-digit', hour12: true });
    });
    
    let datasetLabel = "";
    let dataValues = [];
    let borderColor = "";
    let backgroundColor = "";
    
    if (state.activeChartTab === "temp") {
        datasetLabel = `Temperature (${state.units === "F" ? "°F" : "°C"})`;
        dataValues = hourly.temperature_2m.slice(startIndex, startIndex + sliceCount).map(t => convertTempVal(t));
        borderColor = "#ffa726";
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(255, 167, 38, 0.4)");
        gradient.addColorStop(1, "rgba(255, 167, 38, 0)");
        backgroundColor = gradient;
    } else {
        datasetLabel = "Precipitation Probability (%)";
        dataValues = hourly.precipitation_probability.slice(startIndex, startIndex + sliceCount);
        borderColor = "#29b6f6";
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(41, 182, 246, 0.4)");
        gradient.addColorStop(1, "rgba(41, 182, 246, 0)");
        backgroundColor = gradient;
    }
    
    // Destroy previous instance
    if (state.chartInstance) {
        state.chartInstance.destroy();
    }
    
    const isLight = state.theme === 'light';
    Chart.defaults.color = isLight ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.7)';
    Chart.defaults.font.family = 'Plus Jakarta Sans';
    
    const gridColor = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.05)';
    
    state.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: dataValues,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: borderColor,
                pointBorderColor: 'rgba(255, 255, 255, 0.8)',
                pointHoverRadius: 6,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                    titleColor: isLight ? '#0f172a' : '#fff',
                    bodyColor: isLight ? '#0f172a' : '#fff',
                    borderColor: isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label = ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + (state.activeChartTab === "temp" ? `°${state.units}` : "%");
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor,
                        borderColor: 'transparent'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        color: gridColor,
                        borderColor: 'transparent'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// WeatherCanvas interactive particle background system
class WeatherCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.weatherType = 'weather-clear-day';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.start();
    }
    
    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setWeather(type) {
        if (this.weatherType === type && this.particles.length > 0) return;
        this.weatherType = type;
        this.initParticles();
    }
    
    initParticles() {
        this.particles = [];
        let count = 0;
        
        if (this.weatherType.includes('rainy') || this.weatherType.includes('thunderstorm')) {
            count = 250; // Increased count for thicker density rain
        } else if (this.weatherType.includes('snowy')) {
            count = 80;
        } else if (this.weatherType.includes('foggy')) {
            count = 15;
        } else {
            count = 40; // light sun rays / dust
        }
        
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(true));
        }
    }
    
    createParticle(randomY = false) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const y = randomY ? Math.random() * h : -20;
        
        if (this.weatherType.includes('rainy') || this.weatherType.includes('thunderstorm')) {
            return {
                x: Math.random() * w,
                y: y,
                speed: 15 + Math.random() * 9,
                length: 16 + Math.random() * 12,
                opacity: 0.28 + Math.random() * 0.40, // Increased base opacity
                type: 'rain'
            };
        } else if (this.weatherType.includes('snowy')) {
            return {
                x: Math.random() * w,
                y: y,
                speed: 0.7 + Math.random() * 1.2,
                radius: 1.5 + Math.random() * 2.2,
                opacity: 0.25 + Math.random() * 0.45,
                drift: Math.random() * 2 - 1,
                driftSpeed: 0.01 + Math.random() * 0.02,
                angle: Math.random() * Math.PI * 2,
                type: 'snow'
            };
        } else if (this.weatherType.includes('foggy')) {
            return {
                x: Math.random() * (w + 200) - 100,
                y: Math.random() * h,
                vx: (0.1 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1),
                vy: (0.05 + Math.random() * 0.08) * (Math.random() > 0.5 ? 1 : -1),
                radius: 120 + Math.random() * 90,
                opacity: 0.04 + Math.random() * 0.06,
                type: 'fog'
            };
        } else {
            return {
                x: Math.random() * w,
                y: y === -20 ? Math.random() * h : y,
                vx: Math.random() * 0.4 - 0.2,
                vy: - (0.15 + Math.random() * 0.3),
                radius: 1 + Math.random() * 2,
                opacity: 0.12 + Math.random() * 0.2,
                fadeSpeed: 0.001 + Math.random() * 0.002,
                type: 'beam'
            };
        }
    }
    
    start() {
        const loop = () => {
            this.update();
            this.draw();
            this.animationId = requestAnimationFrame(loop);
        };
        this.animationId = requestAnimationFrame(loop);
    }
    
    update() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            if (p.type === 'rain') {
                p.y += p.speed;
                p.x += p.speed * 0.06;
                if (p.y > h) {
                    this.particles[i] = this.createParticle(false);
                }
            } else if (p.type === 'snow') {
                p.y += p.speed;
                p.angle += p.driftSpeed;
                p.x += Math.sin(p.angle) * 0.35 + p.drift * 0.15;
                if (p.y > h || p.x < 0 || p.x > w) {
                    this.particles[i] = this.createParticle(false);
                }
            } else if (p.type === 'fog') {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -p.radius * 2 || p.x > w + p.radius * 2 || p.y < -p.radius * 2 || p.y > h + p.radius * 2) {
                    p.x = Math.random() * (w + 200) - 100;
                    p.y = Math.random() * h;
                }
            } else if (p.type === 'beam') {
                p.x += p.vx;
                p.y += p.vy;
                p.opacity -= p.fadeSpeed;
                if (p.y < -10 || p.opacity <= 0 || p.x < 0 || p.x > w) {
                    this.particles[i] = this.createParticle(false);
                    this.particles[i].y = h + 10;
                }
            }
        }
    }
    
    draw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            this.ctx.beginPath();
            
            if (p.type === 'rain') {
                const isLight = document.body.classList.contains('light-theme');
                this.ctx.strokeStyle = isLight 
                    ? `rgba(29, 78, 216, ${p.opacity + 0.15})` // Vibrant Royal Blue for contrast on light mode
                    : `rgba(147, 197, 253, ${p.opacity})`;     // Glowing Blue-White for dark mode
                this.ctx.lineWidth = isLight ? 1.6 : 1.2;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x + p.length * 0.06, p.y + p.length);
                this.ctx.stroke();
            } else if (p.type === 'snow') {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (p.type === 'fog') {
                let grad = this.ctx.createRadialGradient(p.x, p.y, 5, p.x, p.y, p.radius);
                grad.addColorStop(0, `rgba(226, 232, 240, ${p.opacity})`);
                grad.addColorStop(1, 'rgba(226, 232, 240, 0)');
                this.ctx.fillStyle = grad;
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (p.type === 'beam') {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}

/* --- INDIA WEATHER EXPLORER IMPLEMENTATION --- */
function initIndiaExplorer() {
    const stateSelect = document.getElementById("india-state-select");
    const citySelect = document.getElementById("india-city-select");
    const chipsContainer = document.getElementById("india-quick-chips");
    
    if (!stateSelect || !citySelect || !chipsContainer) return;
    
    // 1. Populate state dropdown
    const sortedStates = [...INDIA_STATES_DATA].sort((a, b) => a.state.localeCompare(b.state));
    sortedStates.forEach(item => {
        const option = document.createElement("option");
        option.value = item.state;
        option.textContent = `${item.state} (${item.type})`;
        stateSelect.appendChild(option);
    });
    
    // 2. State select change handler
    stateSelect.addEventListener("change", (e) => {
        const selectedStateName = e.target.value;
        
        if (!selectedStateName) {
            citySelect.innerHTML = `<option value="">Select City / Town</option>`;
            citySelect.disabled = true;
            return;
        }
        
        const stateObj = INDIA_STATES_DATA.find(s => s.state === selectedStateName);
        if (!stateObj) return;
        
        // Populate cities
        citySelect.innerHTML = `<option value="">Select City / Town</option>`;
        
        const stateCenterOpt = document.createElement("option");
        stateCenterOpt.value = "__state_center__";
        stateCenterOpt.textContent = "Entire State (Center)";
        citySelect.appendChild(stateCenterOpt);
        
        const capitalCity = stateObj.cities.find(c => c.name.toLowerCase() === stateObj.capital.toLowerCase());
        if (capitalCity) {
            const option = document.createElement("option");
            option.value = capitalCity.name;
            option.textContent = `${capitalCity.name} (Capital)`;
            citySelect.appendChild(option);
        }
        
        const remainingCities = stateObj.cities
            .filter(c => c.name.toLowerCase() !== stateObj.capital.toLowerCase())
            .sort((a, b) => a.name.localeCompare(b.name));
            
        remainingCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city.name;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
        
        citySelect.disabled = false;
        
        // Automatically fetch weather for the state center when state is selected
        selectCity({
            name: stateObj.state,
            country: "India",
            admin: stateObj.type === "UT" ? "Union Territory" : "State",
            lat: stateObj.lat,
            lon: stateObj.lon
        });
    });
    
    // 3. City select change handler
    citySelect.addEventListener("change", (e) => {
        const selectedStateName = stateSelect.value;
        const selectedCityName = e.target.value;
        
        if (!selectedStateName || !selectedCityName) return;
        
        const stateObj = INDIA_STATES_DATA.find(s => s.state === selectedStateName);
        if (!stateObj) return;
        
        if (selectedCityName === "__state_center__") {
            selectCity({
                name: stateObj.state,
                country: "India",
                admin: stateObj.type === "UT" ? "Union Territory" : "State",
                lat: stateObj.lat,
                lon: stateObj.lon
            });
        } else {
            const cityObj = stateObj.cities.find(c => c.name === selectedCityName);
            if (!cityObj) return;
            selectCity({
                name: cityObj.name,
                country: "India",
                admin: stateObj.state,
                lat: cityObj.lat,
                lon: cityObj.lon
            });
        }
    });
    
    // 4. Render Popular Cities quick-access chips
    const popularCities = [
        { name: "New Delhi", admin: "Delhi", lat: 28.6139, lon: 77.2090 },
        { name: "Mumbai", admin: "Maharashtra", lat: 19.0760, lon: 72.8777 },
        { name: "Bengaluru", admin: "Karnataka", lat: 12.9716, lon: 77.5946 },
        { name: "Kolkata", admin: "West Bengal", lat: 22.5726, lon: 88.3639 },
        { name: "Chennai", admin: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
        { name: "Hyderabad", admin: "Telangana", lat: 17.3850, lon: 78.4867 },
        { name: "Pune", admin: "Maharashtra", lat: 18.5204, lon: 73.8567 },
        { name: "Jaipur", admin: "Rajasthan", lat: 26.9124, lon: 75.7873 },
        { name: "Srinagar", admin: "Jammu and Kashmir", lat: 34.0837, lon: 74.7973 },
        { name: "Guwahati", admin: "Assam", lat: 26.1158, lon: 91.7086 }
    ];
    
    chipsContainer.innerHTML = "";
    popularCities.forEach(city => {
        const chip = document.createElement("button");
        chip.className = "quick-chip";
        chip.textContent = city.name;
        chip.dataset.lat = city.lat;
        chip.dataset.lon = city.lon;
        chip.dataset.name = city.name;
        chip.dataset.admin = city.admin;
        
        chip.addEventListener("click", () => {
            selectCity({
                name: city.name,
                country: "India",
                admin: city.admin,
                lat: city.lat,
                lon: city.lon
            });
        });
        
        chipsContainer.appendChild(chip);
    });
}

function syncIndiaExplorerUI() {
    const stateSelect = document.getElementById("india-state-select");
    const citySelect = document.getElementById("india-city-select");
    const chips = document.querySelectorAll(".quick-chip");
    
    if (!stateSelect || !citySelect) return;
    
    const curCity = state.currentCity;
    if (!curCity) return;
    
    // 1. Sync popular quick chips active state
    chips.forEach(chip => {
        const lat = parseFloat(chip.dataset.lat);
        const lon = parseFloat(chip.dataset.lon);
        
        const isMatch = Math.abs(curCity.lat - lat) < 0.01 && Math.abs(curCity.lon - lon) < 0.01;
        if (isMatch) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });
    
    // 2. Sync selectors if currentCity matches local database entries
    let matchedState = null;
    let matchedCity = null;
    let matchedStateCenter = false;
    
    if (typeof INDIA_STATES_DATA !== 'undefined') {
        const stateCenterMatch = INDIA_STATES_DATA.find(s => 
            Math.abs(curCity.lat - s.lat) < 0.01 && Math.abs(curCity.lon - s.lon) < 0.01
        );
        
        if (stateCenterMatch) {
            matchedState = stateCenterMatch;
            matchedStateCenter = true;
        } else {
            for (const stateObj of INDIA_STATES_DATA) {
                const cityMatch = stateObj.cities.find(c => 
                    Math.abs(curCity.lat - c.lat) < 0.01 && Math.abs(curCity.lon - c.lon) < 0.01
                );
                
                if (cityMatch) {
                    matchedState = stateObj;
                    matchedCity = cityMatch;
                    break;
                }
            }
        }
    }
    
    if (matchedState) {
        if (stateSelect.value !== matchedState.state) {
            stateSelect.value = matchedState.state;
            populateCitiesDropdown(matchedState);
        }
        
        if (matchedStateCenter) {
            citySelect.value = "__state_center__";
        } else if (matchedCity) {
            citySelect.value = matchedCity.name;
        } else {
            citySelect.value = "";
        }
    } else {
        stateSelect.value = "";
        citySelect.innerHTML = `<option value="">Select City / Town</option>`;
        citySelect.disabled = true;
    }
}

function populateCitiesDropdown(stateObj) {
    const citySelect = document.getElementById("india-city-select");
    if (!citySelect) return;
    
    citySelect.innerHTML = `<option value="">Select City / Town</option>`;
    
    const stateCenterOpt = document.createElement("option");
    stateCenterOpt.value = "__state_center__";
    stateCenterOpt.textContent = "Entire State (Center)";
    citySelect.appendChild(stateCenterOpt);
    
    const capitalCity = stateObj.cities.find(c => c.name.toLowerCase() === stateObj.capital.toLowerCase());
    if (capitalCity) {
        const option = document.createElement("option");
        option.value = capitalCity.name;
        option.textContent = `${capitalCity.name} (Capital)`;
        citySelect.appendChild(option);
    }
    
    const remainingCities = stateObj.cities
        .filter(c => c.name.toLowerCase() !== stateObj.capital.toLowerCase())
        .sort((a, b) => a.name.localeCompare(b.name));
        
    remainingCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
    
    citySelect.disabled = false;
}
