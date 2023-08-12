import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import LoginPage from "./pages/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [{}],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
