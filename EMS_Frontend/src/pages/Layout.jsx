import { useState } from "react";
import { Box, CssBaseline, Drawer, Button, Typography } from "@mui/material";
import EmpTable from "../Components/EmpTable";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
import { RenderContentProvider } from "../Context/RenderContentContext";

const Layout = () => {
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

      <SideBar
        setActiveContent={setActiveContent}
        activeContent={activeContent}
      />
      {/* Main Content Area */}

      <RenderContentProvider renderContent={renderContent}>
        <div>
          {/* Your layout components like header, sidebar, etc. */}
          <Outlet />
        </div>
      </RenderContentProvider>
    </Box>
  );
};

export default Layout;
