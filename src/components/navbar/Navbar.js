import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
} from "@mui/material";

import ShoppingCartIcon
from "@mui/icons-material/ShoppingCart";

import SearchIcon
from "@mui/icons-material/Search";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./Navbar.css";

function Navbar({
  search = "",
  setSearch = () => {},
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#3f51b5",
      }}
    >

      <Toolbar className="navbar-toolbar">

        <Box className="logo-section">

          <ShoppingCartIcon />

          <Typography
            variant="h6"
            className="logo-text"
          >
            upGrad E-Shop
          </Typography>

        </Box>

        {!isAuthPage && (

          <Box className="search-container">

            <SearchIcon />

            <InputBase
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </Box>
        )}

        <Box className="nav-links">

          {!token && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}

          {token && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/products"
              >
                Home
              </Button>

              {role === "ADMIN" && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/add-product"
                >
                  Add Product
                </Button>
              )}

              <Button
                variant="contained"
                color="error"
                onClick={logout}
              >
                LOGOUT
              </Button>
            </>
          )}

        </Box>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;