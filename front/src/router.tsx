import {
  createBrowserRouter
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RoleCrud from "./components/RoleCrud";
import BodyLayout from "./pages/BodyLayout";
import MainLayout from "./pages/MainLayout";
import RequireAuth from "./pages/RequireAuth";


const protectedRoutes = {
  element: <RequireAuth />,
  children: [
    { path: "/home", element: <></> },
    { path: "/admin/roles", element: <RoleCrud /> }
  ]
}


// const publicRoutes = {
//   element: <PublicLayout />,
//   children: [
//   ]
// }


const bodyLayout = {
   element: <BodyLayout />,
   children: [
      protectedRoutes,
   ]
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      bodyLayout,
      { path: "sign-up", element: <RegisterForm /> },
      { path: "sign-in", element: <LoginForm /> }
    ]
  },
]);

export default router;