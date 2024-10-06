import { Link } from '@mui/material';

export default function Nav() {
  return (
    <nav style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "50px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      alignItems: "center",
      padding: "10px"
    }}>
      <div>Landsat Explorer 2024</div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px"
      }}>
        <Link href="/" underline="hover">Home</Link>
        <Link href="/user-settings" underline="hover">User Settings</Link>
        <Link underline="hover">Download</Link>
        <Link href = "/about" underline="hover">About</Link>
      </div>
    </nav>
  )
}