import { useState, useEffect } from "react";
import api from "../drf.js";
import NavBar from "../components/NavBar.jsx";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function IncidentForm({ mode }) {
  const [location, setLocation] = useState("");
  const [incident_category, setIncidentCategory] = useState("");
  const [received_on, setReceivedOn] = useState("");
  const [details, setDetails] = useState("");
  const [closed_on, setClosedOn] = useState(null);
  const navigate = useNavigate();

  const createIncident = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    api
      .post(
        "/incident/create/",
        {
          location,
          incident_category,
          received_on,
          details,
          closed_on,
        },
      )
      .then((res) => {
        if (res.status === 201) navigate(`/incident/${res.data.id}`);
        else alert("Failed to create incident");
      })
      .catch((error) => alert(error));
  };

  let id = window.location.pathname.split("/").pop();

  const getIncidents = (id) => {
    api
      .get(`/incident/${id}/`)
      .then((res) => {
        setLocation(res.data.location);
        setIncidentCategory(res.data.incident_category);
        setReceivedOn(res.data.received_on);
        setDetails(res.data.details);
        setClosedOn(res.data.closed_on);
      })
      .catch((error) => {
        console.error("Error fetching incident:", error);
      });
  };

  useEffect(() => {
    getIncidents(id);
  }, [id]);

  const updateIncident = (e) => {
    e.preventDefault();
    api
      .put(
        `/incident/${id}/`,
        {
          location,
          incident_category,
          received_on,
          details,
          closed_on,
        },
        console.log(
          "Updated Incident:",
          location,
          incident_category,
          received_on,
          details,
          closed_on
        )
      )
      .then((res) => {
        if (res.status === 200) alert("Incident updated");
        else alert("Failed to update incident");
      })
      .catch((error) => alert(error));
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  let title = id ? `Incident - ${id}` : "New Incident";

  const deleteIncident = (id) => {
    api
      .delete(`/incident/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Incident deleted");
          navigate("/incident");
        } else {
          alert("Failed to delete incident");
        }
      })
      .catch((error) => {
        console.error("Error deleting incident:", error);
      });
  };

  // Form Validation
  const [errors, setErrors] = useState({});

const validateForm = () => {
  let newErrors = {};

  // Add validation for location
  if (!location) {
    newErrors.location = 'Location is required';
  }

  // Add validation for incident_category
  if (!incident_category || incident_category === 'Choose...') {
    newErrors.incident_category = 'Please select a valid incident category';
  }

  // Add validation for received_on
  if (!received_on) {
    newErrors.received_on = 'Received on is required';
  }

  // Add validation for details
  if (!details) {
    newErrors.details = 'Details are required';
  }

  setErrors(newErrors);

  // If no errors, return true, else return false
  return Object.keys(newErrors).length === 0;
};
  return (
    <>
      <NavBar />
      <Container>
        <div>
          <h1>{title}</h1>
          <Button onClick={() => navigate("/incident")} className="m-2" variant="secondary">Back to incidents</Button>
          <Form onSubmit={mode === "Update" ? updateIncident : createIncident}>
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <Alert>{errors.location}</Alert>}
            <Form.Label>Incident Catergory:</Form.Label>
            <Form.Select
              name="incident_category"
              value={incident_category}
              onChange={(e) => setIncidentCategory(e.target.value)}
            >
              <option>Choose...</option>
              <option value="Fly Tipping">Fly Tipping</option>
              <option value="Noise Pollution">Noise Pollution</option>
              <option value="Abandoned Vehicle">Abandoned Vehicle</option>
              <option value="Littering">Littering</option>
              <option value="Statutory Nuisance (e.g. odour, light, etc.)">
                Statutory Nuisance (e.g. odour, light, etc.)
              </option>
              <option value="Presentation of Waste (Domestic)">
                Presentation of Waste (Domestic)
              </option>
              <option value="Presentation of Waste (Commercial)">
                Presentation of Waste (Commercial)
              </option>
              <option value="Atmospheric Pollution (e.g. smoke, fumes, etc.)">
                Atmospheric Pollution (e.g. smoke, fumes, etc.)
              </option>
              <option value="Accumulation of Waste">
                Accumulation of Waste
              </option>
              <option value="Trade Waste Checking">Trade Waste Checking</option>
              <option value="ASB (Anti-Social Behaviour)">
                ASB (Anti-Social Behaviour)
              </option>
            </Form.Select>
            {errors.incident_category && <Alert>{errors.incident_category}</Alert>}
            <Form.Label>Received on:</Form.Label>
            <Form.Control
              type="date"
              name="received_on"
              value={formatDate(received_on)}
              onChange={(e) => setReceivedOn(e.target.value)}
            />
            {errors.received_on && <Alert>{errors.received_on}</Alert>}
            <Form.Label>Details:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            {errors.details && <Alert>{errors.details}</Alert>}
            <Form.Label>Closed on:</Form.Label>
            <Form.Control
              type="date"
              name="closed_on"
              value={formatDate(closed_on)}
              onChange={(e) => setClosedOn(e.target.value)}
            />
            <Button type="submit" className="m-2">
              {mode}
            </Button>
            <Button
              onClick={() => deleteIncident(id)}
              className="m-2"
              variant="danger"
            >
              Delete
            </Button>
            <Button
              className="m-2"
              variant="success"
              onClick={() => navigate(`/actions/${id}`)}
            >
              Actions
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default IncidentForm;
