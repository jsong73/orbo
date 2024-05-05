import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App"
import ErrorPage from "./pages/Error"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Completed from "./pages/Completed"
import TaskId from "./pages/TaskId"
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        //default
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Signup />
      },
      {
        path: "/tasks",
        element: <Tasks />
      },
      {
        path: "/tasks/:id",
        element: <TaskId />
      },
      {
        path: "/completed",
        element: <Completed />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router = {router} />
  </React.StrictMode>
)
