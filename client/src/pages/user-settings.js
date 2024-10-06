import React, { useState } from 'react';
import Nav from '../components/Nav';
import { TextField, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';

export default function UserSettings() {
  const [time, setTime] = useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <Nav />
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontSize: "50px",
        gap: "50px",
        backgroundImage: "url('https://i2.wp.com/www.knoxalliance.store/wp-content/uploads/2017/05/light-color-background-images-for-website-top-hd-images-for-free-background-for-website-in-light-color-1-1024x640.jpg?ssl=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden",
        
      }}>
        User settings
        <div style={{ 
          alignItems: "center",
          textAlign: "center",
          fontSize: "30px",
        }}>
          Notification Method
        </div>
        <div style={{
  fontSize: "25px",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
}}>
  <TextField
    id="outlined-basic"
    label="Number"
    type="tel"
    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
    variant="outlined"
    InputProps={{
      style: {
        backgroundColor: "white",
      },
    }}
  />
  and/or
  <TextField
    id="outlined-basic"
    label="Email"
    type="email"
    variant="outlined"
    InputProps={{
      style: {
        backgroundColor: "white",
      },
    }}
  />
</div>

        <div style ={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            fontSize: "25px",
            gap: "20px"
          }}>
          Overpass Lead Time
          <div style ={{
            fontSize:"15px"
          }}>
            *This is before the Landsat crosses throughout the desired zone
          </div>
          
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                label="Time"
                onChange={handleChange}
                
                sx={{
                  fontSize: "20px",
                  minWidth: "200px",
                  height: "60px",
                  backgroundColor: "white"
                }}
              >
                <MenuItem value={1}>1 hour</MenuItem>
                <MenuItem value={2}>2 hours</MenuItem>
                <MenuItem value={4}>4 hours</MenuItem>
                <MenuItem value={9}>9 hours</MenuItem>
                <MenuItem value={12}>12 hours</MenuItem>
                <MenuItem value={24}>24 hours</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
        <Button sx={{
                  fontSize: "20px",
                  minWidth: "100px",
                  height: "60px",
                }} variant="contained">Save</Button>
        </div>
      </div>
    </div>
  );
}
