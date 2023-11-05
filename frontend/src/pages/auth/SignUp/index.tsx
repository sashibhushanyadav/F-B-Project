import Container from "@mui/material/Container";
import { Row, Col, Form } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  
  const registerSubmitHandler = (e: any) => {
    e.preventdefault();
    console.log({
      email,
      name,
      password,
    });
  };
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col xs={12} md={6}>
          <h1>Sign Up</h1>
          <Form onSubmit={registerSubmitHandler}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              autoFocus
              placeholder="Enter name here"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              autoFocus
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              autoFocus
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirm-password"
              label="Confirm-Password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              autoFocus
              placeholder="Re-Enter Your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Sign-Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
