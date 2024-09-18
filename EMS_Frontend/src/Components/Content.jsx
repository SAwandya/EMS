import React from "react";
import Card from "./Card";
import { Box, Typography } from "@mui/material";
import { useRenderContent } from "../Context/RenderContentContext";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import useEmployees from "../hooks/useEmployees";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import useDepartments from "../hooks/useDepartments";
import { useAuth } from "../Context/AuthContext";

const Content = () => {
  const renderContent = useRenderContent();

  const { data: employeeData } = useEmployees();

  const { data: departmentData } = useDepartments();

  const { getCurrentUser } = useAuth();

  console.log(getCurrentUser());

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "left", marginBottom: "20px" }}
        >
          Hi {getCurrentUser()?.name}!
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card title="Total number of employees" number={employeeData?.length}>
            <BadgeTwoToneIcon
              sx={{ fontSize: "70px", color: "#7350F5", margin: "20px" }}
            />
          </Card>
          <Card
            title="Total number of Departments"
            number={departmentData?.length}
          >
            <AccountBalanceIcon
              sx={{ fontSize: "70px", color: "#7350F5", margin: "20px" }}
            />
          </Card>
        </Box>
        {renderContent()}
      </Box>
    </>
  );
};

export default Content;
