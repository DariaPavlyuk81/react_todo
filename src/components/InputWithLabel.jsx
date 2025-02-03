import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";


const InputWithLabel = ({
  id,
  value,
  onInputChange,
  type = "text",
  placeholder,
  children,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        placeholder={placeholder}
        ref={inputRef}
        style={{ margin: "0 8px " }}
      />
    </>
  );
};
InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
