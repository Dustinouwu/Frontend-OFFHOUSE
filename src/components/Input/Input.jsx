import React from "react";
import './Input.css';


const Input = ({ attribute, param }) => {
    return (
        <div className="input-container">
            
            
            <input
                
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                
                className={param ? 'input-error' : 'regular-style'}>
                

            </input>
            
        </div>
    )
}

export default Input