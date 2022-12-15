import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";
import { MenuData, MenuData2 } from "./MenuData";

const nav = () => {
    return (

        <div className="nav-container">
            <ul className="nav-menu">
                {MenuData.map((item, index) => {
                    return (
                        <li key={index} >
                            <Link className={item.cName} to={item.path}>{item.title}</Link>
                        </li>
                    )
                }
                )}
            </ul>
            <ul className="nav-menu">
                {MenuData2.map((item, index) => {
                    return (
                        <li key={index} >
                            <Link className={item.cName} to={item.path}>{item.title}</Link>
                        </li>
                    )
                }
                )}
            </ul>
        </div>




    )
}

export default nav;