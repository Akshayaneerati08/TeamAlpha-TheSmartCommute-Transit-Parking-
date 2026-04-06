const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let parkingLots = [
  { id: 'A', total: 80, free: 25, reserved: 8, occupied: 47 },
  { id: 'B', total: 50, free: 0, reserved: 5, occupied: 45 },
  { id: 'D', total: 60, free: 20, reserved: 0, occupied: 40 }
];

let events = [
  { id: 1, title: 'Tech Fest 2026 \u2022 Shuttle Service', desc: 'Extra buses from 8AM \u2022 Gate 2 pickup', date: '12 APR', type: 'shuttle', priority: 'high', tag: '+3 buses added' },
  { id: 2, title: 'Convocation Day', desc: 'Parking restricted \u2022 Lot B reserved', date: '14 APR', type: 'parking', priority: 'medium', tag: 'Plan ahead' }
];

let alerts = [
  { id: 1, text: 'Route 5 delayed by 12 minutes due to traffic near East Gate', time: '2 min ago', type: 'warning', icon: 'clock' },
  { id: 2, text: 'Parking Lot B is now full. Try Lot D near Sports Complex', time: '8 min ago', type: 'info', icon: 'parking' },
  { id: 3, text: '5 bikes now available at Hub 3 near Library', time: '15 min ago', type: 'success', icon: 'bike' }
];

let carpools = [
  { id: 1, driver: 'Priya Rajan', degree: 'M.Tech - CSE', route: 'T. Nagar \u2192 IIT Campus', time: '8:30 AM', vehicle: 'Hatchback', seats: 2, price: 45, est: '28 min' },
  { id: 2, driver: 'Karthik M.', degree: 'B.Tech - EEE \u2022 Yr 3', route: 'Adyar \u2192 Campus', time: '9:00 AM', vehicle: 'Sedan', seats: 1, price: 60, est: '35 min' }
];

// Live Map Bus coordinates (Simulated route outside campus into main gate)
const routeCoordinates = [
  [13.0069, 80.2573], // Adyar Signal
  [13.0055, 80.2520], // Sardar Patel Rd intersection
  [13.0039, 80.2464], // Towards CLRI
  [13.0019, 80.2408], // Approaching campus area
  [12.9915, 80.2337]  // IIT Madras Main Gate
];
let currentPosIdx = 0;

// API Endpoints
app.get('/api/dashboard', (req, res) => {
  res.json({
    nextBus: { route: '7A', dest: 'Main Gate', eta: 8, stops: 'Platform 3 \u2022 12 seats free' },
    parking: { free: parkingLots[0].free, lot: parkingLots[0].id },
    bikes: { available: 14, hub: 2 },
    carpool: { available: 3 },
    carbon: { saved: 4.2 },
    alerts: alerts
  });
});

app.get('/api/parking', (req, res) => {
  res.json(parkingLots);
});

app.post('/api/parking/reserve', (req, res) => {
  const lot = parkingLots.find(l => l.id === req.body.lotId);
  if (lot && lot.free > 0) {
    lot.free -= 1;
    lot.reserved += 1;
    res.json({ success: true, lot });
  } else {
    res.status(400).json({ success: false, message: 'No free slots' });
  }
});

app.get('/api/events', (req, res) => {
  res.json({ events, alerts });
});

app.get('/api/carpools', (req, res) => {
  res.json(carpools);
});

// Live polling endpoint for bus position
app.get('/api/live-tracking', (req, res) => {
  // Move to next coordinate simulating time passing
  currentPosIdx = (currentPosIdx + 1) % routeCoordinates.length;
  res.json({
    lat: routeCoordinates[currentPosIdx][0],
    lng: routeCoordinates[currentPosIdx][1],
    eta: 4,
    speed: 28,
    seats: 12
  });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
