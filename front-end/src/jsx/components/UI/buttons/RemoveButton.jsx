import React from "react";
import "../../../../css/RemoveButton.css";
import { Close } from "@mui/icons-material";

export default function RemoveButton({ onClick }) {

    return (
        <div className="remove-button" onClick={(event) => onClick(event)}>
            <Close sx={{ color: "white" }} />
        </div>
    );
}