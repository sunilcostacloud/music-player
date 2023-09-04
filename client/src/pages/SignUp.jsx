import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { registerAction } from "../redux/actions/authActions";
import { REGISTER_USER_RESET } from "../redux/actionTypes/authTypes";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const initState = {
    name: "",
    email: "",
    password: "",
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const [formValues, setFormValues] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("avatar", selectedImage || null);
    dispatch(registerAction(formData));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }

    if (auth.register.isError) {
      toast.error(auth.register.error);
      dispatch({ type: REGISTER_USER_RESET });
    }

    if (auth.register.isSuccess) {
      dispatch({ type: REGISTER_USER_RESET });
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    auth.isAuthenticated,
    auth.register.isError,
    auth.register.error,
    auth.register.isSuccess,
  ]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                id="profile-picture"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="profile-picture">
                <Avatar
                  alt="Profile Picture"
                  src={
                    selectedImage ? URL.createObjectURL(selectedImage) : null
                  }
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                label="Name"
                value={formValues.name}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {auth.register.isLoading ? (
              <CircularProgress sx={{ color: "#fff" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin" style={{ color: "#1976d2" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
