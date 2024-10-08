import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home"; 
import ForgotPassword from "./components/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  },
  {
    path: "/register",
    element: <Register />, 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
