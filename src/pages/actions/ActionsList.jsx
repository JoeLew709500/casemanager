import { useState, useEffect } from "react";
import api from "../../drf.js";
import NavBar from "../../components/NavBar.jsx";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate , } from "react-router-dom";

const ActionsList = () => {
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  let incidentId = window.location.pathname.split("/").pop();

  const getActions = async () => {
    try {
      const res = await api.get(`/actions/list/${incidentId}/`);
      console.log("Response:", res.data);
      setActions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActions();
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}/${month}/${year}`;
  };

  const handleRowClick = (id) => {
    navigate(`/action/${id}`);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Container className="">
        <h1>Actions</h1>
        <Button variant="success" className="m-2" onClick={() => navigate(`/action/create/${incidentId}`)}>New Action</Button>
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Received on</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action.id} onClick={() => handleRowClick(action.id)}>
                <td>{action.id}</td>
                <td>{action.action_code}</td>
                <td>{formatDate(action.completed_on)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ActionsList;
