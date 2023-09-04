import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "./HeaderStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutAction } from "../../redux/actions/authActions";
import { LOGOUT_USER_RESET } from "../../redux/actionTypes/authTypes";

const Header = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (auth.logout.isError) {
      toast.error(auth.logout.error);
    }

    if (auth.logout.isSuccess) {
      dispatch({ type: LOGOUT_USER_RESET });
    }
  }, [dispatch, auth.logout.isError, auth.logout.error, auth.logout.isSuccess]);

  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"black"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, m: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={auth?.user?.name}
            src={auth?.user?.avatar}
            sx={{ width: 60, height: 60, cursor: "pointer" }}
          />
          <Box sx={{ ml: 1 }}>{auth?.user?.name}</Box>
        </Box>
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeclassname="active" to={"/"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/charts"}>Charts</NavLink>
        </li>
        <li>
          <Button variant="contained" onClick={() => dispatch(logoutAction())}>
            Signout
          </Button>
        </li>
      </ul>
    </Box>
  );
  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"#fff"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt={auth?.user?.name}
                  src={auth?.user?.avatar}
                  sx={{ width: 60, height: 60, cursor: "pointer" }}
                />
                <Box sx={{ ml: 1 }}>{auth?.user?.name}</Box>
              </Box>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeclassname="active" to={"/"}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/charts"}>Charts</NavLink>
                </li>
                <li>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(logoutAction())}
                  >
                    Signout
                  </Button>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
