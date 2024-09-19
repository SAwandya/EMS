import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Content from "./Components/Content";
import AddForm from "./Components/AddForm";
import UpdateForm from "./Components/updateForm";
import AddDepForm from "./Components/AddDepForm";
import DeptUpdateForm from "./Components/DeptUpdateForm";
import RegisterForm from "./pages/RegisterForm";
import SignInForm from "./pages/SignInForm";
import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Content />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addemployee",
        element: (
          <ProtectedRoute>
            <AddForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/updateemployee/:id",
        element: (
          <ProtectedRoute>
            <UpdateForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adddepartment",
        element: (
          <ProtectedRoute>
            <AddDepForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/updatedepartment/:id",
        element: (
          <ProtectedRoute>
            <DeptUpdateForm />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/signup",
    element: (
        <RegisterForm />
    ),
  },

  {
    path: "/signin",
    element: (
        <SignInForm />
    ),
  },
]);

export default router;
