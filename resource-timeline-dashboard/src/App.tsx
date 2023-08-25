import React, { useEffect, useState } from "react";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import ResourcePage from "./pages/ResourcePage";
import Cookies from 'universal-cookie';

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

    useEffect(() => {
        const cookies = new Cookies();
        setIsAuthenticated(cookies.get("isAuthenticated") == true);
    }, [isAuthenticated]);

    const router = createHashRouter([
        {
            path: "/",
            element: <Navigate replace to="/login" />
        },
        {
            path: "/login",
            element: < LoginPage />
        },
        {
            path: "/resource",
            element: isAuthenticated? < ResourcePage /> :  <Navigate to='#/login'/>
        }
    ]);

    return (
        <div>
            <Header />
            <RouterProvider router={router} />
        </div>
    )
}