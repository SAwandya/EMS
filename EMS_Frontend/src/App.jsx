import "./App.css";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import router from "./routes";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
