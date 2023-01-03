import React from "react";
import './Labelgiant.css'
const Labelgiant = ({ text }) => {
    return (
        <div className="labelg-containter">
            <label>{text}</label>
        </div>
    )
}

export default Labelgiant;
