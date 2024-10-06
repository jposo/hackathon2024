import React from 'react';
import { Link } from '@mui/material';

const SatelliteLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 16L16 30L30 16L16 2Z" stroke="#2196F3" strokeWidth="2" />
    <circle cx="16" cy="16" r="6" fill="#2196F3" />
    <path d="M16 4V28" stroke="#2196F3" strokeWidth="2" />
    <path d="M4 16H28" stroke="#2196F3" strokeWidth="2" />
  </svg>
);

export default function Nav() {
  return (
    <nav style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "50px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      alignItems: "center",
      padding: "10px",
      fontSize: "24px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <SatelliteLogo />
        <div
          style={{
            fontSize: "28px",
            fontFamily: "Segoe UI"
          }}
        >Landsat Explorer 2024</div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
      }}>
        <Link href="/" underline="hover">Explore</Link>
        <Link href="/user-settings" underline="hover">User Settings</Link>
        <Link href="/about" underline="hover">About</Link>
      </div>
    </nav>
  )
}