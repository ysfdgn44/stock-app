import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { object, string } from "yup";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthCall();
  const { currentUser, error } = useSelector((state) => state.auth);
  const registerSchema = object({
    email: string()
      .email("geçerli email olmalı")
      .required("BU ALAN ZORUNLUDUR"),
    username: string().required("BU ALAN ZORUNLUDUR").max(12),
    first_name: string().required("BU ALAN ZORUNLUDUR").max(20),
    last_name: string().required("BU ALAN ZORUNLUDUR").max(20),
    password: string()
      .required("password zorunludur")
      .min(8, "en az 8 karakter olmalı")
      .max(20)
      .matches(/\d+/, "sayı içermelidir")
      .matches(/[a-z]/, "lowerCase içermelidir")
      .matches(/[&%*.,+-:;#]+/, "special karakter içermelidir")
      .matches(/[A-Z]/, "upperCase içermelidir"),
    // password2: string()
    //   .required("password zorunludur")
    //   .min(8, "en az 8 karakter olmalı")
    //   .max(20)
    //   .matches(/\d+/, "sayı içermelidir")
    //   .matches(/[a-z]/, "lowerCase içermelidir")
    //   .matches(/[&%*.,+-:;#]+/, "special karakter içermelidir")
    //   .matches(/[A-Z]/, "upperCase içermelidir"),
  });
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              // password2: "",
              last_name: "",
              first_name: "",
              username: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              //TODO login (values) Post isteği
              register({ ...values, password2: values.password });
              //TODO navigate
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="User Name"
                    name="username"
                    id="username"
                    type="text"
                    variant="outlined"
                    value={values?.username || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    label="First Name"
                    name="first_name"
                    id="first_name"
                    type="text"
                    variant="outlined"
                    value={values?.first_name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    id="last_name"
                    type="text"
                    variant="outlined"
                    value={values?.last_name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values?.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {/* <TextField
                    label="Password2"
                    name="password2"
                    id="password2"
                    type="password"
                    variant="outlined"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password2 && Boolean(errors.password2)}
                    helperText={touched.password && errors.password}
                  /> */}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    // loading={loading}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
