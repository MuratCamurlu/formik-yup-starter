import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup
    .string()
    .min(6, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .required("Please enter an email")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase")
    .matches(/\d+/, "Password must have a number")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
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
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <TextField
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <LoadingButton
                    loading={loading}
                    loadingPosition="center"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
