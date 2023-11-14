import React from "react";
import AppHeader from "./header/AppHeader";
import { Outlet } from "react-router-dom";
import AppFooter from "./footer/AppFooter";

export default function Layout() {
    return (
        <>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </>
    );
}

