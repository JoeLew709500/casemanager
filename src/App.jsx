import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import IncidentsList from "./pages/IncidentsList";
import IncidentCreate from "./pages/IncidentCreate";
import IncidentDetails from "./pages/IncidentDetails";
import ActionCreate from "./pages/actions/ActionCreate";
import ActionDetails from "./pages/actions/ActionDetails";
import ActionsList from "./pages/actions/ActionsList";
import PhotosList from "./pages/photos/PhotosList";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/incident"
          element={
            <ProtectedRoute>
              <IncidentsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incident/create"
          element={
            <ProtectedRoute>
              <IncidentCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incident/:id"
          element={
            <ProtectedRoute>
              <IncidentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/actions/:id"
          element={
            <ProtectedRoute>
              <ActionsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action/create/:id"
          element={
            <ProtectedRoute>
              <ActionCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action/:id"
          element={
            <ProtectedRoute>
              <ActionDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/photos/:id"
          element={
            <ProtectedRoute>
              <PhotosList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
