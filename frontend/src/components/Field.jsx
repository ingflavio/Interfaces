import React from 'react';

const Field = ({ name, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      name={`input${name}`}
      id={`input${name}`}
      className="inputs"
      placeholder={`Ingrese ${name}`}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Field;