import { useState, useEffect } from "react";
import api from "../drf.js";
import NavBar from "../components/NavBar.jsx";

function IncidentDetails() {
  const [location, setLocation] = useState("");
  const [incident_category, setIncidentCategory] = useState("");
  const [received_on, setReceivedOn] = useState("");
  const [details, setDetails] = useState("");
  const [closed_on, setClosedOn] = useState(null);

  //     const getIncident = async () => {
  //         try {
  //             const res = await api.get(`/incidents/${id}/`);
  //             console.log('Response:', res.data);
  //             setIncident(res.data);
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     };

  //     useEffect(() => {
  //         getIncident();
  //     }, []);

  const createIncident = (e) => {
    e.preventDefault();
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
        console.log(
          "Uploaded Incident:",
          location,
          incident_category,
          received_on,
          details,
          closed_on
        )
      )
      .then((res) => {
        if (res.status === 201) alert("Incident created");
        else alert("Failed to create incident");
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>Incident</h1>
        <form onSubmit={createIncident}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Incident Catergory:</label>
          <select
            name="incident_category"
            value={incident_category}
            onChange={(e) => setIncidentCategory(e.target.value)}
          >
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
            <option value="Accumulation of Waste">Accumulation of Waste</option>
            <option value="Trade Waste Checking">Trade Waste Checking</option>
            <option value="ASB (Anti-Social Behaviour)">
              ASB (Anti-Social Behaviour)
            </option>
          </select>
          <label>Received on:</label>
          <input
            type="date"
            name="received_on"
            value={received_on}
            onChange={(e) => setReceivedOn(e.target.value)}
          />
          <label>Details:</label>
          <input
            type="text"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <label>Closed on:</label>
          <input
            type="date"
            name="closed_on"
            value={closed_on}
            onChange={(e) => setClosedOn(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default IncidentDetails;
