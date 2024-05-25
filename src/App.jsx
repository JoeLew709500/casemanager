import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import IncidentsList from './pages/IncidentsList'
import IncidentCreate from './pages/IncidentCreate'
import IncidentDetails from './pages/IncidentDetails'
import ActionCreate from './pages/actions/ActionCreate'
import ActionDetails from './pages/actions/ActionDetails'
import ActionsList from './pages/actions/ActionsList'


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={ 
              <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/incident" element={<IncidentsList  />} />
        <Route path="/incident/create" element={<IncidentCreate />} />
        <Route path="/incident/:id" element={<IncidentDetails />} />
        <Route path="/actions/:id" element={<ActionsList />} />
        <Route path="/action/create/:id" element={<ActionCreate />} />
        <Route path="/action/:id" element={<ActionDetails />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
