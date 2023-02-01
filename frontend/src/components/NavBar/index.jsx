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
import Logo from "../Logo";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useDispatch, useSelector } from "react-redux";
import { mainMenu } from "../../config/menu";
import PersonIcon from "@mui/icons-material/Person";
import { green, pink } from "@mui/material/colors";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { removeLocalStorageItem } from "../../config/localStorage";
import { getStudentProfile } from "../../apis/student";
import { apiGetUserInfo } from "../../apis/auth";
import { getCompanyProfile } from "../../apis/company";
import GoogleTranslate from "../../utils/googleTranslate";
function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [name, setUserName] = React.useState("");
  React.useEffect(async () => {
    const userInfo = await apiGetUserInfo(localStorage.getItem("accessToken"));
    if (userInfo.role == "student") {
      const result = await getStudentProfile();
      setUserName(result.data.firstName);
    } else if (userInfo.role == "company") {
      const result = await getCompanyProfile();
      setUserName(result.data.short_name);
    }
  }, [name]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

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
    <AppBar position="static" sx={{ backgroundColor: "#8BD3E6" }}>
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
            {user &&
              mainMenu
                .filter((item) => {
                  if (item.role) {
                    if (item.role.includes(user.role)) {
                      return true;
                    }
                    return false;
                  }
                  return true;
                })
                .map((item, i) => (
                  <Button
                    key={i}
                    variant="text"
                    style={{ color: "black", fontSize: "17px", fontWeight: "bold"}}
                    onClick={() => navigate(item.link)}
                  >
                    {item.label}
                  </Button>
                ))}
          </Stack>
          <Typography sx={{p: 2}}><GoogleTranslate /></Typography>
          <Typography sx={{ mr: 1, color: "black", fontWeight: "bold" }}> Hi, {name}</Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                  <PersonIcon />
                </Avatar>
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
                <Typography textAlign="center">Thông tin cá nhân</Typography>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  handleCloseUserMenu();
                  await removeLocalStorageItem("name");
                  navigate(ROUTE.LOGIN);
                }}
              >
                <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
