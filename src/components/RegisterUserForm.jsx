import { useState } from "react";
import api from "../drf";
import { Form, Button, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function RegisterUserForm({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  
    let [first_name, setfirstName] = useState("");
    let [last_name, setlastName] = useState("");
  
    const name = method === "login" ? "Login" : "Register";
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
  
      try {
        const res = await api.post(route, {
          username,
          password,
          first_name,
          last_name,
        });
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        alert('Failed to register. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container className="flex-column d-flex">
        <Form onSubmit={handleSubmit} className="col-md-4">
          <h1>{name}</h1>
          <Row>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Row>
          <Row>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Row>
  
          <Row>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
            />
          </Row>
          <Row>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
            />
          </Row>
  
          <Row>
            <Button type="submit">{name}</Button>
          </Row>
        </Form>
      </Container>
    );
  }
  
  export default RegisterUserForm;
  
