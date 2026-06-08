const weatherCodes = {
    0: {
        description: "Clear Sky",
        class: (isDay) => isDay ? "weather-clear-day" : "weather-clear-night",
        icon: (isDay) => isDay 
            ? `<svg class="svg-float" viewBox="0 0 100 100">
                <circle class="svg-spin" cx="50" cy="50" r="18" fill="#ffb74d" stroke="#ffa726" stroke-width="2" />
                <g class="svg-spin" stroke="#ffa726" stroke-width="4" stroke-linecap="round">
                    <line x1="50" y1="12" x2="50" y2="20" />
                    <line x1="50" y1="80" x2="50" y2="88" />
                    <line x1="12" y1="50" x2="20" y2="50" />
                    <line x1="80" y1="50" x2="88" y2="50" />
                    <line x1="23.14" y1="23.14" x2="28.8" y2="28.8" />
                    <line x1="71.2" y1="71.2" x2="76.86" y2="76.86" />
                    <line x1="23.14" y1="76.86" x2="28.8" y2="71.2" />
                    <line x1="71.2" y1="28.8" x2="76.86" y2="23.14" />
                </g>
               </svg>`
            : `<svg class="svg-float" viewBox="0 0 100 100">
                <path d="M45 25 A 25 25 0 1 0 80 60 A 20 20 0 1 1 45 25 Z" fill="#eceff1" stroke="#cfd8dc" stroke-width="2" />
                <circle cx="25" cy="25" r="1" fill="#fff" opacity="0.8" />
                <circle cx="75" cy="20" r="1.5" fill="#fff" opacity="0.9" />
                <circle cx="85" cy="45" r="1" fill="#fff" opacity="0.7" />
               </svg>`
    },
    1: {
        description: "Mainly Clear",
        class: (isDay) => isDay ? "weather-clear-day" : "weather-clear-night",
        icon: (isDay) => isDay 
            ? `<svg class="svg-float" viewBox="0 0 100 100">
                <circle class="svg-spin" cx="40" cy="45" r="15" fill="#ffb74d" stroke="#ffa726" stroke-width="2" />
                <g class="svg-spin" stroke="#ffa726" stroke-width="3" stroke-linecap="round">
                    <line x1="40" y1="18" x2="40" y2="23" />
                    <line x1="40" y1="67" x2="40" y2="72" />
                    <line x1="13" y1="45" x2="18" y2="45" />
                    <line x1="62" y1="45" x2="67" y2="45" />
                </g>
                <path class="svg-drift-1" d="M48 68 a 12 12 0 0 1 22 -6 a 10 10 0 0 1 18 2 a 12 12 0 0 1 -3 24 H 48 Z" fill="#eceff1" stroke="#b0bec5" stroke-width="1.5" />
               </svg>`
            : `<svg class="svg-float" viewBox="0 0 100 100">
                <path d="M40 30 A 22 22 0 1 0 72 62 A 18 18 0 1 1 40 30 Z" fill="#eceff1" stroke="#cfd8dc" stroke-width="1.5" />
                <path class="svg-drift-1" d="M48 68 a 12 12 0 0 1 22 -6 a 10 10 0 0 1 18 2 a 12 12 0 0 1 -3 24 H 48 Z" fill="#90a4ae" stroke="#78909c" stroke-width="1.5" />
               </svg>`
    },
    2: {
        description: "Partly Cloudy",
        class: (isDay) => isDay ? "weather-cloudy-day" : "weather-cloudy-night",
        icon: (isDay) => isDay
            ? `<svg class="svg-float" viewBox="0 0 100 100">
                <circle class="svg-spin" cx="38" cy="38" r="14" fill="#ffb74d" stroke="#ffa726" stroke-width="1.5" />
                <path class="svg-drift-1" d="M30 65 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#eceff1" stroke="#b0bec5" stroke-width="1.5" />
                <path class="svg-drift-2" d="M52 72 a 10 10 0 0 1 18 -5 a 8 8 0 0 1 14 2 a 10 10 0 0 1 -2 20 H 52 Z" fill="#cfd8dc" stroke="#b0bec5" stroke-width="1" opacity="0.8" />
               </svg>`
            : `<svg class="svg-float" viewBox="0 0 100 100">
                <path d="M35 32 A 20 20 0 1 0 65 62 A 16 16 0 1 1 35 32 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5" />
                <path class="svg-drift-1" d="M30 65 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#78909c" stroke="#546e7a" stroke-width="1.5" />
               </svg>`
    },
    3: {
        description: "Overcast",
        class: (isDay) => isDay ? "weather-cloudy-day" : "weather-cloudy-night",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-2" d="M22 62 a 15 15 0 0 1 27 -8 a 13 13 0 0 1 24 3 a 15 15 0 0 1 -3 30 H 22 Z" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5" />
            <path class="svg-drift-1" d="M35 70 a 16 16 0 0 1 30 -8 a 14 14 0 0 1 25 3 a 16 16 0 0 1 -3 32 H 35 Z" fill="#eceff1" stroke="#b0bec5" stroke-width="1.5" />
        </svg>`
    },
    45: {
        description: "Foggy",
        class: () => "weather-foggy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 55 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#cfd8dc" stroke="#b0bec5" stroke-width="1.5" opacity="0.7" />
            <g stroke="#eceff1" stroke-width="4" stroke-linecap="round" class="svg-wind">
                <line x1="20" y1="65" x2="80" y2="65" />
                <line x1="28" y1="75" x2="72" y2="75" stroke-width="3" />
                <line x1="15" y1="55" x2="60" y2="55" stroke-width="3" />
            </g>
        </svg>`
    },
    48: {
        description: "Depositing Rime Fog",
        class: () => "weather-foggy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 55 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5" opacity="0.6" />
            <g stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" class="svg-wind">
                <line x1="20" y1="65" x2="80" y2="65" />
                <line x1="15" y1="55" x2="65" y2="55" />
            </g>
            <circle class="svg-snow-flake svg-snow-1" cx="35" cy="78" r="1.5" fill="#fff" />
            <circle class="svg-snow-flake svg-snow-2" cx="55" cy="82" r="1.5" fill="#fff" />
        </svg>`
    },
    51: {
        description: "Light Drizzle",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5" />
            <g stroke="#90caf9" stroke-width="2" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="42" y1="75" x2="38" y2="87" />
                <line class="svg-rain-drop svg-rain-2" x1="58" y1="75" x2="54" y2="87" />
            </g>
        </svg>`
    },
    53: {
        description: "Moderate Drizzle",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#90a4ae" stroke="#78909c" stroke-width="1.5" />
            <g stroke="#64b5f6" stroke-width="2" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="34" y2="87" />
                <line class="svg-rain-drop svg-rain-2" x1="50" y1="78" x2="46" y2="90" />
                <line class="svg-rain-drop svg-rain-3" x1="62" y1="75" x2="58" y2="87" />
            </g>
        </svg>`
    },
    55: {
        description: "Dense Drizzle",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#78909c" stroke="#546e7a" stroke-width="1.5" />
            <g stroke="#42a5f5" stroke-width="2.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="32" y2="89" />
                <line class="svg-rain-drop svg-rain-2" x1="48" y1="77" x2="42" y2="91" />
                <line class="svg-rain-drop svg-rain-3" x1="58" y1="75" x2="52" y2="89" />
                <line class="svg-rain-drop svg-rain-2" x1="66" y1="77" x2="60" y2="91" />
            </g>
        </svg>`
    },
    56: {
        description: "Light Freezing Drizzle",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#cfd8dc" stroke="#b0bec5" stroke-width="1.5" />
            <g stroke="#90caf9" stroke-width="1.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="40" y1="75" x2="36" y2="85" />
                <line class="svg-rain-drop svg-rain-2" x1="56" y1="75" x2="52" y2="85" />
            </g>
            <circle class="svg-snow-flake svg-snow-1" cx="48" cy="80" r="1.5" fill="#fff" />
        </svg>`
    },
    57: {
        description: "Dense Freezing Drizzle",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#b0bec5" stroke="#90a4ae" stroke-width="1.5" />
            <g stroke="#64b5f6" stroke-width="1.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="34" y2="85" />
                <line class="svg-rain-drop svg-rain-2" x1="58" y1="75" x2="54" y2="85" />
            </g>
            <circle class="svg-snow-flake svg-snow-1" cx="46" cy="80" r="1.5" fill="#fff" />
            <circle class="svg-snow-flake svg-snow-2" cx="50" cy="88" r="1.5" fill="#fff" />
        </svg>`
    },
    61: {
        description: "Slight Rain",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#90a4ae" stroke="#78909c" stroke-width="1.5" />
            <g stroke="#42a5f5" stroke-width="2.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="40" y1="75" x2="34" y2="88" />
                <line class="svg-rain-drop svg-rain-2" x1="56" y1="75" x2="50" y2="88" />
            </g>
        </svg>`
    },
    63: {
        description: "Moderate Rain",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#78909c" stroke="#546e7a" stroke-width="1.5" />
            <g stroke="#1e88e5" stroke-width="2.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="32" y2="89" />
                <line class="svg-rain-drop svg-rain-2" x1="50" y1="77" x2="44" y2="91" />
                <line class="svg-rain-drop svg-rain-3" x1="60" y1="75" x2="54" y2="89" />
            </g>
        </svg>`
    },
    65: {
        description: "Heavy Rain",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#455a64" stroke="#37474f" stroke-width="1.5" />
            <g stroke="#1565c0" stroke-width="3" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="36" y1="75" x2="28" y2="91" />
                <line class="svg-rain-drop svg-rain-2" x1="48" y1="77" x2="40" y2="93" />
                <line class="svg-rain-drop svg-rain-3" x1="60" y1="75" x2="52" y2="91" />
                <line class="svg-rain-drop svg-rain-2" x1="68" y1="77" x2="60" y2="93" />
            </g>
        </svg>`
    },
    66: {
        description: "Light Freezing Rain",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#cfd8dc" stroke="#b0bec5" stroke-width="1.5" />
            <g stroke="#42a5f5" stroke-width="2" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="32" y2="87" />
                <line class="svg-rain-drop svg-rain-2" x1="56" y1="75" x2="50" y2="87" />
            </g>
            <circle class="svg-snow-flake svg-snow-1" cx="47" cy="80" r="2" fill="#fff" />
        </svg>`
    },
    67: {
        description: "Heavy Freezing Rain",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#90a4ae" stroke="#78909c" stroke-width="1.5" />
            <g stroke="#1e88e5" stroke-width="2.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="36" y1="75" x2="30" y2="87" />
                <line class="svg-rain-drop svg-rain-2" x1="48" y1="77" x2="42" y2="89" />
                <line class="svg-rain-drop svg-rain-3" x1="60" y1="75" x2="54" y2="87" />
            </g>
            <circle class="svg-snow-flake svg-snow-1" cx="42" cy="82" r="2" fill="#fff" />
            <circle class="svg-snow-flake svg-snow-2" cx="54" cy="85" r="2" fill="#fff" />
        </svg>`
    },
    71: {
        description: "Slight Snowfall",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#eceff1" stroke="#cfd8dc" stroke-width="1.5" />
            <g fill="#fff" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="38" cy="74" r="2.5" />
                <circle class="svg-snow-2" cx="50" cy="80" r="2.5" />
                <circle class="svg-snow-3" cx="62" cy="74" r="2.5" />
            </g>
        </svg>`
    },
    73: {
        description: "Moderate Snowfall",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#eceff1" stroke="#cbd5e1" stroke-width="1.5" />
            <!-- Snow Flake details using small path stars or circles -->
            <g fill="#fff" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="36" cy="74" r="3" />
                <circle class="svg-snow-2" cx="46" cy="82" r="3" />
                <circle class="svg-snow-3" cx="56" cy="74" r="3" />
                <circle class="svg-snow-1" cx="64" cy="82" r="2.5" />
            </g>
        </svg>`
    },
    75: {
        description: "Heavy Snowfall",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <g fill="#fff" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="34" cy="74" r="3.5" />
                <circle class="svg-snow-2" cx="44" cy="82" r="3.5" />
                <circle class="svg-snow-3" cx="54" cy="74" r="3.5" />
                <circle class="svg-snow-1" cx="64" cy="82" r="3.5" />
                <circle class="svg-snow-2" cx="38" cy="90" r="3" />
                <circle class="svg-snow-3" cx="50" cy="92" r="3" />
            </g>
        </svg>`
    },
    77: {
        description: "Snow Grains",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#eceff1" stroke="#cfd8dc" stroke-width="1.5" />
            <g fill="#fff" class="svg-snow-flake">
                <rect class="svg-snow-1" x="38" y="73" width="3" height="3" rx="1" />
                <rect class="svg-snow-2" x="50" y="79" width="3" height="3" rx="1" />
                <rect class="svg-snow-3" x="62" y="73" width="3" height="3" rx="1" />
            </g>
        </svg>`
    },
    80: {
        description: "Slight Rain Showers",
        class: () => "weather-rainy",
        icon: (isDay) => isDay 
            ? `<svg class="svg-float" viewBox="0 0 100 100">
                <circle class="svg-spin" cx="38" cy="38" r="14" fill="#ffb74d" stroke="#ffa726" stroke-width="1.5" />
                <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#90a4ae" stroke="#78909c" stroke-width="1.5" />
                <g stroke="#42a5f5" stroke-width="2.5" stroke-linecap="round">
                    <line class="svg-rain-drop svg-rain-1" x1="40" y1="75" x2="34" y2="88" />
                    <line class="svg-rain-drop svg-rain-2" x1="56" y1="75" x2="50" y2="88" />
                </g>
               </svg>`
            : `<svg class="svg-float" viewBox="0 0 100 100">
                <path d="M35 32 A 20 20 0 1 0 65 62 A 16 16 0 1 1 35 32 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5" />
                <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#78909c" stroke="#546e7a" stroke-width="1.5" />
                <g stroke="#42a5f5" stroke-width="2.5" stroke-linecap="round">
                    <line class="svg-rain-drop svg-rain-1" x1="40" y1="75" x2="34" y2="88" />
                    <line class="svg-rain-drop svg-rain-2" x1="56" y1="75" x2="50" y2="88" />
                </g>
               </svg>`
    },
    81: {
        description: "Moderate Rain Showers",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#78909c" stroke="#546e7a" stroke-width="1.5" />
            <g stroke="#1e88e5" stroke-width="2.5" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="38" y1="75" x2="32" y2="89" />
                <line class="svg-rain-drop svg-rain-2" x1="50" y1="77" x2="44" y2="91" />
                <line class="svg-rain-drop svg-rain-3" x1="60" y1="75" x2="54" y2="89" />
            </g>
        </svg>`
    },
    82: {
        description: "Violent Rain Showers",
        class: () => "weather-rainy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#455a64" stroke="#37474f" stroke-width="1.5" />
            <g stroke="#1565c0" stroke-width="3" stroke-linecap="round" class="svg-wind">
                <line class="svg-rain-drop svg-rain-1" x1="36" y1="75" x2="28" y2="91" />
                <line class="svg-rain-drop svg-rain-2" x1="48" y1="77" x2="40" y2="93" />
                <line class="svg-rain-drop svg-rain-3" x1="60" y1="75" x2="52" y2="91" />
            </g>
        </svg>`
    },
    85: {
        description: "Slight Snow Showers",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <circle class="svg-spin" cx="38" cy="38" r="14" fill="#ffb74d" stroke="#ffa726" stroke-width="1" />
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#eceff1" stroke="#cfd8dc" stroke-width="1.5" />
            <g fill="#fff" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="38" cy="74" r="2.5" />
                <circle class="svg-snow-2" cx="50" cy="80" r="2.5" />
            </g>
        </svg>`
    },
    86: {
        description: "Heavy Snow Showers",
        class: () => "weather-snowy",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 52 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
            <g fill="#fff" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="34" cy="74" r="3.5" />
                <circle class="svg-snow-2" cx="44" cy="82" r="3.5" />
                <circle class="svg-snow-3" cx="54" cy="74" r="3.5" />
                <circle class="svg-snow-1" cx="64" cy="82" r="3.5" />
            </g>
        </svg>`
    },
    95: {
        description: "Thunderstorm",
        class: () => "weather-thunderstorm",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 48 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#37474f" stroke="#263238" stroke-width="1.5" />
            <polygon class="svg-lightning" points="48,68 36,82 46,82 40,96 56,78 46,78" fill="#ffeb3b" stroke="#fdd835" stroke-width="1" />
            <g stroke="#90caf9" stroke-width="2" stroke-linecap="round">
                <line class="svg-rain-drop svg-rain-1" x1="32" y1="72" x2="28" y2="82" />
                <line class="svg-rain-drop svg-rain-2" x1="62" y1="72" x2="58" y2="82" />
            </g>
        </svg>`
    },
    96: {
        description: "Thunderstorm with Hail",
        class: () => "weather-thunderstorm",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 48 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#37474f" stroke="#263238" stroke-width="1.5" />
            <polygon class="svg-lightning" points="46,68 34,82 44,82 38,96 54,78 44,78" fill="#ffeb3b" stroke="#fdd835" stroke-width="1" />
            <g fill="#e0e0e0" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="30" cy="74" r="3" />
                <circle class="svg-snow-2" cx="58" cy="74" r="3" />
            </g>
        </svg>`
    },
    99: {
        description: "Severe Thunderstorm with Hail",
        class: () => "weather-thunderstorm",
        icon: () => `<svg class="svg-float" viewBox="0 0 100 100">
            <path class="svg-drift-1" d="M30 48 a 14 14 0 0 1 26 -7 a 11 11 0 0 1 20 2 a 14 14 0 0 1 -3 28 H 30 Z" fill="#212121" stroke="#000" stroke-width="1.5" />
            <polygon class="svg-lightning" points="46,68 32,82 44,82 36,98 56,78 44,78" fill="#ffeb3b" stroke="#ffa000" stroke-width="1.5" />
            <g fill="#eeeeee" class="svg-snow-flake">
                <circle class="svg-snow-1" cx="28" cy="74" r="3.5" />
                <circle class="svg-snow-2" cx="58" cy="74" r="3.5" />
                <circle class="svg-snow-3" cx="44" cy="85" r="3.5" />
            </g>
        </svg>`
    }
};

// Fallback lookup
function getWeatherDetails(code, isDay) {
    const data = weatherCodes[code] || {
        description: "Unknown Conditions",
        class: () => "weather-clear-day",
        icon: () => `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" fill="gray"/></svg>`
    };
    
    return {
        description: data.description,
        bgClass: typeof data.class === 'function' ? data.class(isDay) : data.class,
        iconHtml: typeof data.icon === 'function' ? data.icon(isDay) : data.icon
    };
}
