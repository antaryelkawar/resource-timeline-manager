import React, { useEffect, useState } from "react";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";

export interface Client {
    name: string;
    id: string;
}

export default function App() {

    const router = createHashRouter([
        {
            path: "/",
            element: <Navigate replace to="/login" />
        },
        {
            path: "/login",
            element: < LoginPage />
        }
    ]);

    return (
        <div>
            <Header />
            <RouterProvider router={router} />
        </div>
    )
}