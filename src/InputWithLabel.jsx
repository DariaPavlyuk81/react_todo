import React, { useEffect, useRef } from 'react';


const InputWithLabel = ({ id, value, onInputChange, type = "text", placeholder, children}) => {
    
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    },[]); 
    
    
    
    return (
        <>
        <label htmlFor={id}>{children}</label>
        <input
        type = {type}
        id = {id}
        value = {value}
        onChange={onInputChange }
        placeholder={placeholder}
        ref = {inputRef}
        style = {{margin: "0 8px "}}
        />
        </>
    );
};

export default InputWithLabel;