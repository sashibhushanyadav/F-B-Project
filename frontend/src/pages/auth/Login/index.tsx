import { Formik } from "formik";
import { TextField, Button, Container } from "@mui/material";
import { object, string } from "yup";
import { Col, Form, Row } from "react-bootstrap";
import { AuthInterface } from "../../../interface/auth.interface";
import { postData } from "../../../services/axios.service";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../services/toaster.services";

const Login = () => {
  let initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  let authValidationSchema = object({
    email: string().email().required("Email is a required field"),
    password: string()
      .min(8, "Minimun length of password should be 8")
      .required("Password is a required field"),
  });

  const loginHandler = async (values: AuthInterface) => {
    const resp = await postData("/auth/login", values);
    debugger;
    if (resp.status === "success") {
      navigate("/products");
      successToast("User logged in successfully");
    }
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6}>
            <h1>Log In</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={authValidationSchema}
              onSubmit={loginHandler}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus
                      placeholder="Enter Your Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="mb-4">
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus
                      placeholder="Enter Your Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">
                      {touched.password && errors.password}
                    </span>
                  </div>
                  <Button type="submit" variant="contained">
                    Log-In
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
