import { Box, Typography } from "@mui/material";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import useEmployees from "../hooks/useEmployees";


const Card = ({children, title, number}) => {

  const { data } = useEmployees();

  return (
    <Box
      sx={{
        height: "17vh",
        width: "60vh",
        backgroundColor: "#F0EEFA",
        borderRadius: "30px",
        display: "flex",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      {children}
      <Box sx={{ marginTop: "19px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "5px",
            color: "#7f8c9b",
          }}
        >
          {title}
        </Typography>
        <Typography variant="h3" sx={{ marginTop: "7px", color: "#444b54" }}>
          {number}
        </Typography>
      </Box>
    </Box>
  );
}

export default Card