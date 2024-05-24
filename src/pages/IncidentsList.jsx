import { useState, useEffect } from 'react';
import api from '../drf.js';
import NavBar from '../components/NavBar.jsx';


const IncidentsList = () => {
    const [incidents, setIncidents] = useState([]);
    
    const getIncidents = async () => {
        try {
        const res = await api.get('/incident/');
        console.log('Response:', res.data);
        setIncidents(res.data);
        } catch (error) {
        console.log(error);
        }
    };
    
    useEffect(() => {
        getIncidents();
    }, []);
    
    return (
        <>
        <NavBar />
        <div>
        <h1>Incidents</h1>
        <ul>
            {incidents.map((incident) => (
            <li key={incident.id}>
                <h2>{incident.location}</h2>
                <p>{incident.incident_category}</p>
                <p>{incident.received_on}</p>
                <p>{incident.details}</p>
                <p>{incident.closed_on}</p>
            </li>
            ))}
        </ul>
        </div>
        </>
    );
    }

export default IncidentsList;