import "./App.css";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import router from "./routes";


function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
