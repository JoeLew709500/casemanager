import { useState } from "react";
import api from "../drf";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function UserForm({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    /**
    * This function is used to handle the form submission. It validates the form and sends a POST request to the API to either login or register a user.
    */
    setLoading(true);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    /**
     * This function is used to validate the form. It checks if the username and password fields are not empty and sets the form errors if they are.
     */
    let errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;;
  }

  return (
    <>
    <Container className="flex-column d-flex">
      <Container>
      <Form onSubmit={handleSubmit} className="col-md-4">
        <h1>{name}</h1>
        <Form.Group className="mb-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {formErrors.username && <Alert>{formErrors.username}</Alert>}
        </Form.Group>
        
        <Form.Group className="mb-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {formErrors.password && <Alert>{formErrors.password}</Alert>}
        </Form.Group>
          <Button type="submit">{name}</Button>
      </Form>
    </Container>
    </Container>
    </>
  );
}

export default UserForm;
