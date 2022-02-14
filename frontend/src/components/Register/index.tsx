import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthService from "services/services";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    let navigate = useNavigate();


  return (
    <div>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                .max(255)
                .required("Firstname Required"),
                lastName: Yup.string()
                .max(255)
                .required("Lastname Required"),
                email: Yup.string()
                .email("Invalid Email")
                .max(255)
                .required("Email Required"),
              password: Yup.string().min(3, 'Password must be at least 3 characters').required("Password Required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                AuthService.register(values.firstName, values.lastName, values.email, values.password).then(
                  () => {
                    navigate("/");
                    window.location.reload();
                  },
                  (error) => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
                  }
                );
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      align="center"
                      variant="h4"
                      sx={{ color: "text.secondary" }}
                      component="h2"
                    >
                      Sign Up
                    </Typography>

                    <TextField
                      id="firstName"
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      label="Name"
                      variant="outlined"
                      sx={{ marginY: "10px" }}
                    />

                    {errors.firstName && touched.firstName ? (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        color="error.main"
                      >
                        {errors.firstName}
                      </Typography>
                    ) : null}

                    <TextField
                      id="lastName"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      label="Surname"
                      variant="outlined"
                      sx={{ marginY: "10px" }}
                    />

                    {errors.lastName && touched.lastName ? (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        color="error.main"
                      >
                        {errors.lastName}
                      </Typography>
                    ) : null}

                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      label="Email"
                      variant="outlined"
                      sx={{ marginY: "10px" }}
                    />

                    {errors.email && touched.email ? (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        color="error.main"
                      >
                        {errors.email}
                      </Typography>
                    ) : null}

                    <TextField
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      label="Password"
                      variant="outlined"
                      sx={{ marginY: "10px"}}
                    />

                    {errors.password && touched.password ? (
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        color="error.main"
                      >
                        {errors.password}
                      </Typography>
                    ) : null}

                    <Button sx={{marginTop: '10px'}} variant="contained" type="submit" title="submit">
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
