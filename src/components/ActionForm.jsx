import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import NavBar from './NavBar';
import api from '../drf';

const ActionForm = () => {

  let incidentId = window.location.pathname.split("/").pop();

  const [action, setAction] = useState({
    action_code: '',
    details: '',
    incident: incidentId,
    completed_on: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    setAction({
      ...action,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/actions/create/', action).then((res) => {
        if (res.status === 201) alert('Action created');
        else alert('Failed to create action');
        }).catch((error) => alert(error));
  };

  console.log(action);

  return (
    <>
    <Container>
    <NavBar />
    <Form onSubmit={handleSubmit}>
      

      <Form.Group controlId="code">
        <Form.Label>Code</Form.Label>
        <Form.Select
          name="action_code"
          value={action.code}
          onChange={handleChange}
          >
            <option>Choose...</option>
            <option value="Visit to site">Visit to site</option>
            <option value="Notice Issued">Notice Issued</option>
            <option value="Referral">Referral</option>
            <option value="General Notes">General Notes</option>
            <option value="Out going communications">Out going communications</option>
        </Form.Select>

        <Form.Group controlId="detail">
        <Form.Label>Detail</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="details"
          value={action.details}
          onChange={handleChange}
        />
      </Form.Group>
        
      </Form.Group>
      <Form.Group controlId="completed_on">
        <Form.Label>Completed On</Form.Label>
        <Form.Control
            type="date"
            name="completed_on"
            value={action.completed_on}
            onChange={handleChange}
            />
        </Form.Group>
        
        

      {/* Add other form groups as needed */}

      <Button variant="primary" type="submit" className='m-2'>
        Submit
      </Button>
    </Form>
    </Container>
    
</> 
  );
};

export default ActionForm;