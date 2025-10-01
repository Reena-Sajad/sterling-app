// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ProjectDetails from "../pages/ProjectDetails.jsx";
import NewProject from "../pages/NewProject.jsx";
import UnlinkedInvoices from "../pages/UnlinkedInvoices.jsx";
import InvoiceDetails from "../pages/InvoiceDetails.jsx";
import UserManagement from "../pages/UserManagement.jsx";
import CreateUser from "../pages/CreateUser.jsx";

import Layout from "../components/Layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected area with shared left-nav layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/unlinked-invoices" element={<UnlinkedInvoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/new" element={<CreateUser />} />
        </Route>
      </Routes>
    </Router>
  );
}
