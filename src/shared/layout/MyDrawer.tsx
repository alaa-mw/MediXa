import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import TokenService from "../services/tokenService";
import { sideBarLabels } from "../constants/sideBarLabels";
import NavItem from "./NavItem";
import type { Role } from "../../app/routes/roles";
import logonobg from "../../assets/logonobg.png";
import logoWhite from "../../assets/logo_white.png";

interface MyDrawerProps {
  handleDrawerClose?: () => void;
}

const MyDrawer = ({ handleDrawerClose }: MyDrawerProps) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { selectedCourseId, selectedCourseName } = useSelectedCourse();

  // const { mutate: logout } = useSendData(
  //   `${rolesConfig[localStorage.getItem("userRole") || ""].apiPrefix}/logout`,
  //   undefined
  // );
  const handleLogout = () => {
    TokenService.clearTokens();
    window.location.href = "/";
    // logout(undefined, {
    //   onSuccess: () => {
    //     dispatch(logoutSuccess());
    //     window.location.href = "/";
    //   },
    // });
  };

  const role: Role = (TokenService.getUserRole() as Role) || "ADMIN";
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "100vh",
        display: "flex",
        flexDirection: "column",

        // backgroundImage: `url(${drawerFrame})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 3,
          pb: 1,
          pl: 3,
        }}
      >
        {" "}
        <Box
          component="img"
          src={logoWhite}
          alt="Logo"
          width={120}
          sx={{
            height: "auto",
            objectFit: "contain",
            scale: "1.2",
          }}
        />
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {sideBarLabels?.[role]?.map((item, index) => {
          return (
            <Box key={index}>
              <NavItem
                // eslint-disable-next-line no-constant-binary-expression
                path={`/${TokenService.getUserRole()?.toLocaleLowerCase()}${item.path}`}
                title={item.title}
                icon={item.icon}
              />
            </Box>
          );
        })}
      </List>
      <Divider sx={{ bgcolor: "#fff" }} />
      {/* Secondary Navigation */}
      <List sx={{ justifySelf: "flex-end" }}>
        {["تسجيل الخروج"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "primary.contrastText" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: "primary.contrastText" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyDrawer;
