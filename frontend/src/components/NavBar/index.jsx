import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../Logo";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/slices/authSlice";
import { removeLocalStorageItem } from "../../config/localStorage";

const settings = ["Account", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#a4b0be" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ flexGrow: 1, ml: 2 }}
          >
            <Button
              variant="text"
              style={{ color: "#fff", fontSize: "17px" }}
              onClick={() => navigate(ROUTE.COMPANY)}
            >
              Company Info
            </Button>
            <Button
              variant="text"
              style={{ color: "#fff", fontSize: "17px" }}
              onClick={() => navigate(ROUTE.APPLY_INTERNSHIP)}
            >
              Apply Internship
            </Button>
            <Button
              variant="text"
              style={{ color: "#fff", fontSize: "17px" }}
              onClick={() => navigate(ROUTE.COMPANY_REQUESTS)}
            >
              Requests
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(ROUTE.PROFILE);
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  removeLocalStorageItem("accessToken")
                  dispatch(clearData());
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
