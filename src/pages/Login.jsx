import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { authService } from "../services/authservice.js";
import { theme } from "../styles/theme.js";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lock page scroll ONLY while this component is mounted
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        login(result.user);
        navigate("/home");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to show test credentials (remove in production!)
  const showTestCredentials = () => {
    const users = authService.getTestUsers();
    const message = users
      .map(u => `${u.role.toUpperCase()}: ${u.email} / ${u.password}`)
      .join('\n');
    alert(`Test Credentials:\n\n${message}`);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        fontFamily: theme.fonts.body,
        background: theme.colors.background
      }}
    >
      {/* Left image */}
      <div
        style={{
          position: "relative",
          flex: 1,
          height: "100%",
          backgroundImage: "url('/assets/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Logo container */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="/assets/plateau-logo.png"
            alt="Plateau Logo"
            style={{
              padding: "4px",
              height: "50px",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />
        </div>
      </div>

      {/* Right form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem"
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{ 
            marginBottom: "1.5rem", 
            fontSize: "1.8rem", 
            fontWeight: 600, 
            color: theme.colors.accent 
          }}>
            Log in
          </h2>

          {/* Error message */}
          {error && (
            <div style={{
              padding: "12px",
              marginBottom: "1rem",
              background: "#fee",
              border: "1px solid #fcc",
              borderRadius: 6,
              color: "#c33",
              fontSize: "0.9rem"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem" 
          }}>
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: 4, 
                color: "#555", 
                fontSize: "0.9rem" 
              }}>
                User name or email address
              </label>
              <input
                type="email"
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: `1px solid ${theme.colors.border}`,
                  opacity: loading ? 0.6 : 1
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: "block", 
                marginBottom: 4, 
                color: "#555", 
                fontSize: "0.9rem" 
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: `1px solid ${theme.colors.border}`,
                  opacity: loading ? 0.6 : 1
                }}
              />
            </div>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 6, 
              fontSize: "0.85rem" 
            }}>
              <input type="checkbox" id="remember" disabled={loading} />
              <label htmlFor="remember">Remember password</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading ? "#ccc" : theme.colors.primary,
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: "1rem",
                color: theme.colors.accent,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <a 
              href="#" 
              style={{ 
                textAlign: "center", 
                display: "block", 
                marginTop: 10, 
                color: "#555", 
                fontSize: "0.85rem" 
              }}
            >
              Forgot your password?
            </a>
          </form>

          <div style={{ 
            marginTop: "1.5rem", 
            borderTop: "1px solid #ddd", 
            textAlign: "center", 
            paddingTop: "1rem" 
          }}>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>or</p>
            <button
              type="button"
              disabled={loading}
              style={{
                marginTop: "0.75rem",
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1
              }}
            >
              <img 
                src="/assets/microsoft-logo.png" 
                alt="Microsoft" 
                style={{ width: 18, height: 18 }} 
              />
              Continue with Microsoft
            </button>
          </div>

          {/* Test credentials helper (REMOVE IN PRODUCTION!) */}
          <button
            type="button"
            onClick={showTestCredentials}
            style={{
              marginTop: "1.5rem",
              width: "100%",
              padding: "8px",
              background: "#f0f0f0",
              border: "1px dashed #999",
              borderRadius: 4,
              fontSize: "0.8rem",
              color: "#666",
              cursor: "pointer"
            }}
          >
            🔧 Show Test Credentials (Dev Only)
          </button>
        </div>
      </div>
    </div>
  );
}