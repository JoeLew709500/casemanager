import { useState, useEffect } from "react";
import api from "../drf.js";
import NavBar from "../components/NavBar.jsx";
import { Container, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const IncidentsList = () => {
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();


  const getIncidents = async () => {
    try {
      const res = await api.get("/incident/");
      console.log("Response:", res.data);
      setIncidents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncidents();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/incident/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <NavBar />
      <Container>
        <Container className="">
        <h1>Incidents</h1>
        <Link to="/incident/create"><Button variant="success" className="m-2">New Incident</Button></Link>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Category</th>
              <th>Received on</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} onClick={() => handleRowClick(incident.id)}>
                <td>{incident.id}</td>
                <td>{incident.location}</td>
                <td>{incident.incident_category}</td>
                <td>{formatDate(incident.received_on)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default IncidentsList;
