import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/authActions";
import { toast } from "react-toastify";
import { LOGIN_RESET } from "../redux/actionTypes/authTypes";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const initState = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAction(formValues));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }

    if (auth.login.isError) {
      toast.error(auth.login.error);
      dispatch({ type: LOGIN_RESET });
    }

    if (auth.login.isSuccess) {
      dispatch({ type: LOGIN_RESET });
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    auth.isAuthenticated,
    auth.login.isError,
    auth.login.error,
    auth.login.isSuccess,
  ]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {auth.login.isLoading ? (
              <CircularProgress sx={{ color: "#fff" }} />
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" style={{ color: "#1976d2" }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
