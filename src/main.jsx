import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
