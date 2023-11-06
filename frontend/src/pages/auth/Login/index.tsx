// import React from 'react';
import Container from "@mui/material/Container";
import { Row, Col, Form } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { object, string } from "yup";

const Login = () => {
  let initialValues = {
    email: "",
    password: "",
  };

  let authValidationSchema = object({
    email: string().email().required("Email is a required field"),
    password: string()
      .min(8, "Minimun length of the password should be 8")
      .required("Password is a required field"),
  });

  const loginHandler = (values: any) => {
    // console.log(values);
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h1>Log In</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={authValidationSchema}
            onSubmit={loginHandler}
          >
            {({ handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* <div> */}
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    className="mb-4"
                    required
                    fullWidth
                    autoFocus
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                  />
                {/* </div> */}
                {/* {console.log(errors)} */}
                {/* <div> */}
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    className="mb-4"
                    required
                    fullWidth
                    autoFocus
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                  />
                {/* </div> */}
                <Button type="submit" variant="contained">
                  Log-In
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
