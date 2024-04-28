
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import Error404 from "./pages/Error404";
import EditTask from "./pages/EditTask";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./layout/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tasks",
          element: <MyTask />,
        },
        {
          path: "/new",
          element: <NewTask />,
        },
        {
          path: "/edit/:id",
          element: <EditTask />,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;