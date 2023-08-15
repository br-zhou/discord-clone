import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AppLayout from "./pages/AppLayout/AppLayout";
import RoomPage from "./pages/RoomPage/RoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "room",
        element: <AppLayout />,
        children: [{ path: ":roomId", element: <RoomPage /> }],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
