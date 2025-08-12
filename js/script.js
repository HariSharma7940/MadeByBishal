// Map initialization
let map = L.map('map').setView([27.7, 85.3], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom bus icon
const busIcon = L.icon({
  iconUrl: 'img.webp',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

// Locations dictionary
const locations = {
  "ratnapark": [27.7051, 85.3150],
  "kalanki": [27.6911, 85.2845],
  "baneshwor": [27.6930, 85.3420],
  "koteshwor": [27.6780, 85.3640],
  "newroad": [27.7044, 85.3096],
  "maitighar": [27.6936, 85.3222],
  "tripureshwor": [27.6933, 85.3127],
  "gaushala": [27.7097, 85.3451],
  "baluwatar": [27.7295, 85.3313],
  "gongabu": [27.7363, 85.3127],
  "samakhusi": [27.7243, 85.3186],
  "dilli bazaar": [27.7071, 85.3300],
  "chabahil": [27.7200, 85.3475],
  "bouddha": [27.7215, 85.3616],
  "kapan": [27.7389, 85.3650],
  "pulchowk": [27.6753, 85.3178],
  "jawalakhel": [27.6710, 85.3153],
  "lagankhel": [27.6677, 85.3228],
  "satdobato": [27.6589, 85.3234],
  "gwarko": [27.6653, 85.3403],
  "ekantakuna": [27.6641, 85.3182],
  "imadol": [27.6625, 85.3553],
  "bungamati": [27.6192, 85.3001],
  "kumaripati": [27.6714, 85.3162],
  "suryabinayak": [27.6715, 85.4575],
  "kamalbinayak": [27.6795, 85.4316],
  "thimi": [27.6806, 85.3895],
  "bhaktapur durbar square": [27.6710, 85.4288],
  "sallaghari": [27.6789, 85.4056],
  "jagati": [27.6728, 85.4471],
  "dadhikot": [27.6733, 85.3921],
  "lokanthali": [27.6840, 85.3765],
  "balkot": [27.6771, 85.4040]
};

// Add location markers
for (let place in locations) {
  const coords = locations[place];
  L.marker(coords)
    .addTo(map)
    .bindPopup(`<b>${place.charAt(0).toUpperCase() + place.slice(1)}</b>`);
}

// Your base bus data
const busData = {
  "sajha": [
    { name: "Sajha #1", lat: 27.6925, lng: 85.342, eta: "7 min" },
    { name: "Sajha #2", lat: 27.703, lng: 85.321, eta: "10 min" },
    { name: "Sajha #3", lat: 27.694, lng: 85.343, eta: "12 min" },
    { name: "Sajha #4", lat: 27.698, lng: 85.330, eta: "9 min" },
    { name: "Sajha #5", lat: 27.700, lng: 85.335, eta: "11 min" },
    { name: "Sajha #6", lat: 27.695, lng: 85.320, eta: "13 min" },
    { name: "Sajha #7", lat: 27.699, lng: 85.340, eta: "8 min" },
    { name: "Sajha #8", lat: 27.701, lng: 85.338, eta: "14 min" }
  ],
  "mahayogi": [
    { name: "Mahayogi #1", lat: 27.678, lng: 85.364, eta: "12 min" },
    { name: "Mahayogi #2", lat: 27.685, lng: 85.353, eta: "9 min" },
    { name: "Mahayogi #3", lat: 27.684, lng: 85.350, eta: "14 min" },
    { name: "Mahayogi #4", lat: 27.682, lng: 85.355, eta: "10 min" },
    { name: "Mahayogi #5", lat: 27.680, lng: 85.360, eta: "11 min" },
    { name: "Mahayogi #6", lat: 27.686, lng: 85.349, eta: "8 min" },
    { name: "Mahayogi #7", lat: 27.683, lng: 85.351, eta: "15 min" },
    { name: "Mahayogi #8", lat: 27.679, lng: 85.358, eta: "13 min" }
  ],
  "nepal-yatayat": [
    { name: "Nepal Yatayat #1", lat: 27.715, lng: 85.324, eta: "6 min" },
    { name: "Nepal Yatayat #2", lat: 27.717, lng: 85.320, eta: "9 min" },
    { name: "Nepal Yatayat #3", lat: 27.713, lng: 85.322, eta: "12 min" },
    { name: "Nepal Yatayat #4", lat: 27.718, lng: 85.325, eta: "10 min" },
    { name: "Nepal Yatayat #5", lat: 27.716, lng: 85.319, eta: "11 min" }
  ]
};

function bookTicket(busName) {
  alert(`Ticket purchase successful for ${busName}! (Demo only, no backend)`);
}

function updateBusInfo() {
  const bus = document.getElementById("bus-select").value;
  const locationEl = document.getElementById("location");
  const seatsEl = document.getElementById("seats");
  const etaEl = document.getElementById("eta");

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // ✅ Random seats 0–14 per bus
  const selected = (busData[bus] || []).map(b => ({
    ...b,
    seats: Math.floor(Math.random() * 15)
  }));

  selected.forEach(b => {
    L.marker([b.lat, b.lng], { icon: busIcon })
      .addTo(map)
      .bindPopup(
        `<b>${b.name}</b><br>Seats: ${b.seats}<br>ETA: ${b.eta}<br><button onclick="bookTicket('${b.name}')">Purchase Ticket</button>`
      );
  });

  if (selected.length > 0) {
    map.setView([selected[0].lat, selected[0].lng], 13);
    locationEl.textContent = `${bus.replace('-', ' ')} Buses running: ${selected.length}`;

    const totalSeats = selected.reduce((sum, b) => sum + b.seats, 0);
    seatsEl.textContent = `🟢 Total available seats: ${totalSeats}`;
    etaEl.textContent = "🚏 ETA (nearest): " + selected[0].eta;
  } else {
    locationEl.textContent = '';
    seatsEl.textContent = '';
    etaEl.textContent = '';
  }
}

function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

function submitFeedback() {
  const feedback = document.getElementById("feedback-text").value;
  const response = document.getElementById("feedback-response");
  if (feedback.trim()) {
    response.textContent = "Thank you for your feedback!";
    document.getElementById("feedback-text").value = "";
  } else {
    response.textContent = "Please write something before submitting.";
  }
}

function showRoute() {
  const from = document.getElementById("from").value.toLowerCase().trim();
  const to = document.getElementById("to").value.toLowerCase().trim();

  if (locations[from] && locations[to]) {
    const fromCoord = locations[from];
    const toCoord = locations[to];

    L.Routing.control({
      waypoints: [
        L.latLng(fromCoord[0], fromCoord[1]),
        L.latLng(toCoord[0], toCoord[1])
      ],
      routeWhileDragging: false
    }).addTo(map);
  } else {
    alert("❌ Invalid location. Try Kalanki, Baneshwor, Koteshwor, Ratnapark, Newroad.");
  }
}
