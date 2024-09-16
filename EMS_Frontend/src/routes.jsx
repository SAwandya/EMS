import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Content from "./Components/Content";
import AddForm from "./Components/AddForm";
import UpdateForm from "./Components/updateForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Content />,
      },
      {
        path: "/addemployee",
        element: <AddForm />,
      },
      {
        path: "/updateemployee/:id",
        element: <UpdateForm />,
      },
    ],
  },

  // {
  //   path: "/signup",
  //   element: <SignupPage />,
  // },

  // {
  //   path: "/signin",
  //   element: <SignInPage />,
  // },
]);

export default router;
