import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import AddJob from "../pages/AddJob/AddJob";
import EditJob from "../pages/EditJob/EditJob";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/', element: <Layout />, children: [
            { path: '/', element: <Login /> },
            { path: '/add-job', element: <AddJob /> },
            { path: '/edit-job', element: <EditJob /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <SignUp /> },
            { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        ]
    }

])