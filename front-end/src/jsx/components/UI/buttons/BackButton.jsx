import React from "react";
import "../../../../css/BackButton.css";
import { ArrowBack } from "@mui/icons-material";

export default function BackButton({ onClick }) {

    return (
        <div className="back-button" onClick={onClick}>
            <ArrowBack sx={{ color: "white" }} />
        </div>
    );
}