import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import NavBar from "./NavBar";
import api from "../drf";
import { useNavigate } from "react-router-dom";

const ActionForm = ({ mode }) => {
  const navigate = useNavigate();
  const [actionId, setActionId] = useState("");

  let incidentId = window.location.pathname.split("/").pop();

  let id = incidentId;

  const [action, setAction] = useState({
    action_code: "",
    details: "",
    incident: incidentId,
    completed_on: "",
  });

  const getAction = (id) => {
    api
      .get(`/actions/${id}/`)
      .then((res) => {
        setAction(res.data);
        setActionId(res.data.id);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error here
          navigate("/*");
        } else {
          alert(error);
        }});
  };

  if (mode === "Update") {
    useEffect(() => {
      getAction(id);
    }, [id]);
  }

  const handleChange = (e) => {
    setAction({
      ...action,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    api
      .post("/actions/create/", action)
      .then((res) => {
        if (res.status === 201) {
          navigate(`/actions/${incidentId}`);
        } else alert("Failed to create action");
      })
  }};

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

  const deleteAction = (actionId, incidentId) => {
    api
      .delete(`/actions/delete/${actionId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Action deleted");
          navigate(`/actions/${incidentId}`);
        } else {
          alert("Failed to delete action");
        }
      })
  };

  const updateAction = (e) => {
    e.preventDefault();
    api
      .put(`/actions/${actionId}/`, {
        action_code: action.action_code,
        details: action.details,
        incident: action.incident,
        completed_on: action.completed_on,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/actions/${incident}`);
        } else alert("Failed to update action");
      })
  };

  const title = actionId ? `Action - ${actionId}` : "New Action";
  let incident = actionId ? action.incident : incidentId;

  // Form Validation
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Add validation for action_code
    if (!action.action_code || action.action_code === 'Choose...') {
      newErrors.action_code = "Action code is required";
    }

    // Add validation for details
    if (!action.details) {
      newErrors.details = "Details are required";
    }

    // Add validation for completed_on
    if (!action.completed_on) {
      newErrors.completed_on = "Completed on date is required";
    }

    setErrors(newErrors);

    // If no errors, return true, else return false
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <NavBar />
      <Container>
        <h1>{title}</h1>
        <Button
          className="m-2"
          variant="secondary"
          onClick={() => navigate(`/actions/${incident}`)}
        >
          Back to actions
        </Button>
        <Form onSubmit={mode === "Update" ? updateAction : handleSubmit}>
          <Form.Group controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Select
              name="action_code"
              value={action.action_code}
              onChange={handleChange}
            >
              <option>Choose...</option>
              <option value="Visit to site">Visit to site</option>
              <option value="Notice Issued">Notice Issued</option>
              <option value="Referral">Referral</option>
              <option value="General Notes">General Notes</option>
              <option value="Out going communications">
                Out going communications
              </option>
            </Form.Select>
            {errors.action_code && <Alert>{errors.action_code}</Alert>}
          </Form.Group>

          <Form.Group controlId="details">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="details"
              value={action.details}
              onChange={handleChange}
            />
            {errors.details && <Alert>{errors.details}</Alert>}
          </Form.Group>
          <Form.Group controlId="completed_on">
            <Form.Label>Completed On</Form.Label>
            <Form.Control
              type="date"
              name="completed_on"
              value={formatDate(action.completed_on)}
              onChange={handleChange}
            />
            {errors.completed_on && <Alert>{errors.completed_on}</Alert>}
          </Form.Group>

          <Button variant="primary" type="submit" className="m-2">
            {mode}
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteAction(actionId, action.incident)}
            className="m-2"
          >
            Delete
          </Button>
          <Button
            variant="success"
            onClick={() => navigate(`/photos/${actionId}`)}
            className="m-2"
          >
            Photos
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ActionForm;
