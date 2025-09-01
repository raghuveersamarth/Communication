import { metadata } from "../layout";

// /app/dashboard/Login/layout.js
export default function LoginLayout({ children }) {
    metadata.title = "Login - " + "Login to Your Account";
    metadata.description = "Access your account by logging in.";
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
      {children}
    </div>
  );
}
