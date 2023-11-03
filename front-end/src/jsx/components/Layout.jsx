import React from "react";
import AppHeader from "./header/AppHeader";
import MainContainer from "./UI/containers/MainContainer";
import { Outlet } from "react-router-dom";
import AppFooter from "./footer/AppFooter";
import ErrorMessage from "./UI/other/ErrorMessage";
import LoadingSpinner from "./UI/other/LoadingSpinner";

export default function Layout({ error, isLoading }) {
    return (
        <>
            <AppHeader />
            <MainContainer>
                {
                    error
                        ? <ErrorMessage error={error} />
                        : isLoading
                            ? <LoadingSpinner />
                            : <Outlet />
                }
            </MainContainer>
            <AppFooter />
        </>
    );
}

