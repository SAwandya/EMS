import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import SideBarButton from "./SideBarButton";
import { useAuth } from "../Context/AuthContext";

const SideBar = ({ setActiveContent, activeContent }) => {
  const drawerWidth = 240;

  const {logout} = useAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "300px",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        sx={{
          marginTop: "29px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#381aa3",
        }}
      >
        Dashboard
      </Typography>
      <Box sx={{ p: 2, marginTop: "20px" }}>
        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Employee"
        />

        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Department"
        />
        <SideBarButton
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          title="Profile"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8A6BFF",
            width: "252px",
            height: "30px",
            marginTop: "310px",
            borderRadius: "5px",
          }}
          onClick={logout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideBar;
