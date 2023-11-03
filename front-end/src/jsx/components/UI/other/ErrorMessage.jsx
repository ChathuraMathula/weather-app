import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function ErrorMessage(props) {

    return (
        <Alert severity='error' >
            <AlertTitle>{props.error}</AlertTitle>
        </Alert >
    );
}