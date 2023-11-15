import React from "react";
import "../../../../css/AddCityButton.css";
import { CircularProgress } from "@mui/material";

export default function AddCityButton({ type, disabled, isChanging, isLoading }) {

    return (
        <button
            className="add-city-button"
            type={type}
            disabled={disabled}
        >
            {
                isLoading
                    ?
                    <CircularProgress style={{ color: "white", height: "0.8rem", width: "0.8rem" }} />
                    : "Add City"
            }
        </button>
    );
}