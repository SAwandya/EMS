import "./App.css";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import router from "./routes";
import { AuthProvider } from "./Context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Set Poppins as the default font
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
