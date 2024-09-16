import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Content from "./Components/Content";
import AddForm from "./Components/AddForm";
import UpdateForm from "./Components/updateForm";
import AddDepForm from "./Components/AddDepForm";
import DeptUpdateForm from "./Components/DeptUpdateForm";

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
      {
        path: "/adddepartment",
        element: <AddDepForm />,
      },
      {
        path: "/updatedepartment/:id",
        element: <DeptUpdateForm />,
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
