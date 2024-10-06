import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Link, TextField, Slider, Hidden } from '@mui/material';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Nav from './components/Nav';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [coords, setCoords] = useState({lat: 0, lng: 0});
  const [allowClick, setAllowClick] = useState(false);

  const CoordOnClick = () => {
    const map = useMapEvents({
      click(e) {
        if (allowClick) {
          setCoords(e.latlng);
          setAllowClick(false);
        }
      },
    });
    return null;
  };

  const toggleAllowClick = () => {
    setAllowClick(true);
  };


  const handleCoordLatChange = (event) => {
    if (event.target.value >= -90 && event.target.value <= 90)
      setCoords({ ...coords, lat: event.target.value });
  };

  const handleCoordLngChange = (event) => {
    if (event.target.value >= -180 && event.target.value <= 180)
      setCoords({ ...coords, lng: event.target.value });
  };

  const position = [32.656003555872466, -115.40669953280681];

  const path = [
              [
                -116.87804,
                32.50049
              ],
              [
                -114.90615,
                32.11548
              ],
              [
                -114.41278,
                33.8394
              ],
              [
                -116.42403,
                34.22439
              ],
              [
                -116.87804,
                32.50049
              ]
            ]
  const switched = path.map(coord => [coord[1], coord[0]]);

  return (
    <div className="App" style={{
      display: "flex",
      flexDirection: "column",
      position: 'relative', 
      width: "100vw", 
      height: "100vh", 
      overflow: "hidden",
    }}>
      <Nav />
      <MapContainer
        center={position}
        zoom={4}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CoordOnClick />
        <Marker position={[coords.lat, coords.lng]}></Marker>
        <Polygon pathOptions={{ color: "red" }} positions={switched} />
      </MapContainer>
      <div style={{
        position: "absolute",
        top: "150px",
        left: "10px",
        zIndex: 1000,
        width: "400px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div style = {{
            textAlign: "left",
            fontSize:"20px",
          }}>
            Search location
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            height: "100%"
          }}>
            <TextField value={coords.lat} onChange={handleCoordLatChange} label="Latitude" />
            <TextField value={coords.lng} onChange={handleCoordLngChange} label="Longitute" />
            <Button style={{fontSize: "12px"}} onClick={toggleAllowClick} variant="outlined">
              {allowClick ? 'Click Location' : 'Select on Map'}
            </Button>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div style = {{
            textAlign: "left",
            fontSize:"20px",
          }}>
            Cloud Coverage Filter
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}>
            <Slider 
              size="small"
              aria-label="cloud-coverage-filter-slider"
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div style = {{
            textAlign: "left",
            fontSize:"20px",
          }}>
            Date Range Selector
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}>
            <TextField 
              id="filter-end-date"
              type="date" 
              label="Starting day" 
              defaultValue="2017-05-24"
            />
            <TextField 
              id="filter-start-date"
              type="date" 
              label="Ending day" 
              defaultValue="2024-10-05"
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Starting day" />
            </LocalizationProvider> */}
          </div>
        </div>
        <Button variant="contained">Confirm</Button>
      </div>
    </div>
  );
}

export default App;
