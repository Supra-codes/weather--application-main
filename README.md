# Altitude // Weather for You

Altitude is a sleek, premium, bento-grid styled frontend weather web application. It provides an immersive user experience by combining real-time meteorological data with interactive, weather-themed particle canvas systems and shifting ambient aurora flows that dynamically adapt to current conditions.

The application features a dedicated, deeply mapped regional navigation matrix tailored specifically for exploring localized weather across India.

---

## 🌟 Key Features

* **Bento Grid Interface:** Clean, modern dashboard layout optimized for quick scannability across both desktop and mobile screens.


* **Dynamic Theme & Ambience:** Fluid shifting aurora background gradients and particle engines (`WeatherCanvas`) matching real-time weather codes (e.g., animated rain ripples for storms, floating crystals for snow).


* **India Weather Hub:** A custom-engineered exploration utility allowing instant navigation through structured data configurations of every Indian State, Union Territory, and their major commercial/capital urban tracks.


* **Comprehensive Data Metrics:** Detailed display tracking for Temperature bounds, high-fidelity UV index gauges, dynamic SVG compass layouts for wind velocities, humidity indexes, visibility indices, barometric pressure, and dew points.


* **24-Hour Trend Visualizations:** Interactive chart logic driven by Chart.js mapping temperature variations and hourly precipitation probability tables.


* **Multi-Engine Geocoding API Search:** Dual-powered query routing integrating local databases with Open-Meteo and Nominatim OpenStreetMap search APIs alongside device-level native GPS positioning.



---

## 📁 Project Structure

The codebase is engineered strictly with modular vanilla frontend files:

* `index.html`: Layout container mapping the underlying responsive structural bento layout.


* `styles.css`: Custom system design parameters tracking color variables, glassmorphism filters, animations, and dark/light mode overrides.


* `app.js`: Master controller parsing client states, rendering interface updates, and executing asynchronous REST API fetch operations.


* `indiaData.js`: Static database configurations cataloging localized latitude and longitude parameters for primary cities across India.


* `weatherCodes.js`: Dynamic dictionary mapping numeric WMO weather classification outputs directly to explicit descriptions and animated SVG artwork assets.



---

## 🛠️ Data Sources & Tech Stack

* **Core UI:** Vanilla HTML5, CSS3 Custom Properties (Variables), and Modern ES6 JavaScript.


* **Data Aggregation:** Open-Meteo Free Forecast API.


* **Geocoding & Locations:** Nominatim OpenStreetMap Search Service & Open-Meteo Geocoding.


* **Data Visualization:** Chart.js Library via CDN.



---

## 🚀 How to Run the App

### Option A: Local Execution

1. Clone or download the source repository files into a unified directory.
2. Launch a local web server from your workspace root.
* If using **VS Code**, click **Go Live** via the Live Server extension.
* Alternatively, execute via terminal: `python -m http.server 8000`.


3. Open your preferred browser and navigate to `http://localhost:8000` (or designated port).

### Option B: Mobile Deployment

* **GitHub Pages:** Upload the codebase directly to a public GitHub repository and activate **GitHub Pages** from the repository settings sidebar to get a live, universally accessible link on your mobile device.
* **Progressive Web App (PWA):** Link a standard `manifest.json` asset bundle inside the main HTML file header to allow direct mobile home screen installation.

---

## 📱 Mobile Responsiveness

The styling engine handles scaling seamlessly across different device configurations:

* **Desktop & Laptops:** Full 12-column bento grids displaying comprehensive analytical panels concurrently.


* **Tablets:** 8-column scaled structural adjustments maintaining grid proportions.


* **Smartphones:** Stacked, singular-column mobile design with custom scroll wrappers for time-series charts and selector elements.
