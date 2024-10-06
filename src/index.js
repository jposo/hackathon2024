import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserSettings from './pages/user-settings';
import reportWebVitals from './reportWebVitals';
import About from './pages/about';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<App />} />
        <Route path="user-settings" element={<UserSettings />} />
        <Route path="about" element={<About/>} />
        {/* <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
