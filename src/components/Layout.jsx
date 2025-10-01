// src/components/Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 260, borderRight: "1px solid #eee", padding: 16 }}>
        <h3>Construction Admin</h3>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/unlinked-invoices">Unlinked Invoices</NavLink>
          <NavLink to="/admin/users">User Management</NavLink>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
