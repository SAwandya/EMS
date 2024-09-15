import { useState } from "react";
import { Box, CssBaseline, Drawer, Button, Typography } from "@mui/material";
import EmpTable from "./EmpTable";
import Card from "./Card";
import SideBarButton from "./SideBarButton";

const drawerWidth = 240;

const SideBar = () => {
  // State to manage the active content
  const [activeContent, setActiveContent] = useState("Home");

  // Function to render dynamic content based on button click
  const renderContent = () => {
    switch (activeContent) {
      case "Employee":
        return <EmpTable />;
      case "Department":
        return <Typography variant="h4">Settings Page</Typography>;
      case "Profile":
        return <Typography variant="h4">Profile Page</Typography>;
      default:
        return <Typography variant="h4">Welcome to the Home Page</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
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

      {/* Main Content Area */}

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "left", marginBottom: "20px" }}
        >
          Welcome to the Hom e Page
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card />
          <Card />
        </Box>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default SideBar;
