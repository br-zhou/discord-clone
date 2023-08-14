import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppPage from "./pages/AppPage/AppPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LoginPage /> },
      { path: "room/:roomId", element: <AppPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
