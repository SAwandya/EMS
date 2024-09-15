import React from "react";
import Card from "./Card";
import { Box, Typography } from "@mui/material";
import { useRenderContent } from "../Context/RenderContentContext";

const Content = () => {
  const renderContent = useRenderContent();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
      <Typography variant="h5" sx={{ textAlign: "left", marginBottom: "20px" }}>
        Welcome to the Home Page
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
  );
};

export default Content;
