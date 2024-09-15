import React from "react";
import { Box, Drawer, Typography } from "@mui/material";
import SideBarButton from "./SideBarButton";

const SideBar = ({ setActiveContent, activeContent }) => {
  const drawerWidth = 240;

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
      <Typography sx={{ marginTop: "20px", fontSize: "30px" }}>
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
      </Box>
    </Drawer>
  );
};

export default SideBar;
