import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppPage from "./pages/AppPage/AppPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  { path: "app", element: <AppPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
