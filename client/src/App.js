import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Link, TextField, Slider, Hidden } from '@mui/material';
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
  const [coords, setCoords] = useState({lat: 32.656003555872466, lng: -115.40669953280681});
  const [allowClick, setAllowClick] = useState(false);
  const [scenePath, setScenePath] = useState({data: [], identity: null});
  const [sceneInfo, setSceneInfo] = useState({data: [], identity: null});
  const [showSceneInfo, setShowSceneInfo] = useState([false, -1]);
  const [cloudFilter, setCloudFilter] = useState(50);
  const [dateFilter, setDateFilter] = useState(['2024-01-01', '2024-10-05'])

  const CoordOnClick = () => {
    const map = useMapEvents({
      click(e) {
        // console.log(e);
        console.log(sceneInfo);
        Object.entries(e.target._layers).forEach(([key, value]) => {
          let id = value.options.identity;
          // console.log(key, value)
          if (scenePath.data.length > 0) {
            console.log('show');
            setShowSceneInfo([true, id]);
            return;
          }
        });
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

  const showData = async () => {
    const payload = {
      cloudCoverageFilter: cloudFilter,
      filterDateStart: dateFilter[0],
      filterDateEnd: dateFilter[1],
      coordinate: [coords.lat, coords.lng],
    };
    const response = await fetch('/api/scene-search', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log(data);
    let points = data.data.results[0].spatialBounds.coordinates[0];
    setSceneInfo({ identity: 'scene1', data });
    setScenePath({ data: points, identity: 'scene1' });
  };

  const changeCloudFilter = (event, newValue) => {
    setCloudFilter(newValue);
  };

  const changeStartDay = (event, newValue) => {
    setDateFilter([newValue, dateFilter[1]]);
  };

  const changeEndDay = (event, newValue) => {
    setDateFilter([dateFilter[0], newValue]);
  };

  const downloadData = () => {
    if (!sceneInfo.data) return;
    const dataStr = JSON.stringify(sceneInfo.data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'landsat-data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

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
        <Polygon 
          key="scene-1"
          identity={scenePath.identity}
          pathOptions={{ color: "red" }} 
          positions={scenePath.data.map(coord => [coord[1], coord[0]])} 
        />
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
              value={cloudFilter}
              onChange={changeCloudFilter}
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
              id="filter-start-date"
              type="date" 
              label="Starting day" 
              value={dateFilter[0]}
              onChange={changeStartDay}
            />
            <TextField 
              id="filter-end-date"
              type="date" 
              label="Ending day" 
              value={dateFilter[1]}
              onChange={changeEndDay}
            />
          </div>
        </div>
        <Button onClick={showData} variant="contained">Confirm</Button>
      </div>


      
      {showSceneInfo[0] === true && <div style={{
        position: "absolute",
        top: "75px",
        right: "10px",
        zIndex: 1000,
        width: "300px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}>
        <div style={{ marginBottom: "10px", fontSize: "22px", fontWeight: "400" }}>Satellite Metadata</div>
        <div style={{ marginBottom: "10px" }}>Acquisition Satellite</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField id="outlined-basic" label="" variant="outlined" value={showSceneInfo[0] ? sceneInfo.data.data.results[0].entityId : ''} />
          <div style={{ marginBottom: "15px" }}>Last Overpass Date</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              height: "100%",
            }}
          >
            <TextField id="outlined-basic" label="" variant="outlined" placeholder="Date" value={showSceneInfo[0] ? sceneInfo.data.data.results[0].publishDate : ''} />
            {/* <TextField id="outlined-basic" label="" variant="outlined" placeholder="Time" /> */}
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          WRS Path and Row
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            height: "100%",
          }}
        >
          <TextField id="outlined-basic" label="" variant="outlined" placeholder="Path" value={showSceneInfo[0] ? sceneInfo.data.data.results[0].metadata[2].value : ''} />
          <TextField id="outlined-basic" label="" variant="outlined" placeholder="Row" value={showSceneInfo[0] ? sceneInfo.data.data.results[0].metadata[3].value : ''} />
        </div>
        <div>
          <div>
            <div style={{ marginBottom: "10px" }}> {/* Reduced the margin for the text only */}
              Cloud Coverage Percentage
            </div>
            <div>
              <TextField id="outlined-basic" label="" variant="outlined" placeholder="Cloud coverage %" value={showSceneInfo[0] ? sceneInfo.data.data.results[0].cloudCover : ''} />
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "10px" }}> {/* Reduced the margin for the text only */}
            Approximated Next Overpass Date
          </div>
          <div>
            <TextField id="outlined-basic" label="" variant="outlined" placeholder="Next overpass date" value={showSceneInfo[0] ? sceneInfo.data.nextPassDate : ''} />
          </div>
        </div>
        <Button onClick={downloadData} variant="contained">Download Data</Button>
      </div>}
    </div>
  );
}

export default App;
