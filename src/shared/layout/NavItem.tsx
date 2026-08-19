import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { type Theme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom"; 
import TokenService from "../services/tokenService";

interface NavItemProps {
  path: string;
  title: string;
  icon?: React.ElementType;
  selectedCourse?: boolean;
  variant?: "default" | "withIndicator";
  theme?: Theme;
}

const NavItem: React.FC<NavItemProps> = ({
  path,
  title,
  icon: Icon,
  selectedCourse = true,
  variant = "default",
  theme,
}) => {
  const location = useLocation();

  const userRole = TokenService.getUserRole()?.toLocaleLowerCase();
  const basePath = `/${userRole}`;
  
  const isSelected = 
    path === basePath 
      ? location.pathname === path 
      : location.pathname.startsWith(path);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={RouterLink}
        to={path}
        selected={isSelected}
        disabled={!selectedCourse}
        sx={{
          ...(variant === "withIndicator" && {
            mr: 5,
            borderRight: `1px solid gray`,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "gray",
              transition: "all 0.2s ease",
              zIndex: 1,
            },
          }),
          "&.Mui-selected": {
            ...(variant === "withIndicator"
              ? {
                  borderRight: `1.5px solid ${theme?.palette.primary.contrastText}`,
                  "&::before": {
                    backgroundColor: "primary.contrastText",
                    transform: "translateY(-50%) scale(1.3)",
                  },
                }
              : {
                  backgroundColor: "secondary.main",
                  borderRadius: "0px 50px 50px 0px",
                  "&:hover": {
                    backgroundColor: "secondary.main", 
                  },
                }),
          },
        }}
      >
        {Icon && (
          <ListItemIcon>
            <Box component={Icon} sx={{ color: "#fff" }} />
          </ListItemIcon>
        )}
        <ListItemText
          primary={title}
          sx={{
            color: "primary.contrastText",
            ...(variant === "withIndicator" && { pr: 2 }),
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;