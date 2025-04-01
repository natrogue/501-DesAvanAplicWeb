import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: '12px',
        margin: '10px 0',
        borderRadius: '6px',
        border: '2px solid #ffd1c1',
        fontSize: '1rem',
        outline: 'none',
      }}
    />
  );
};

export default InputField;