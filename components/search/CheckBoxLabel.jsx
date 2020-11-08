import React from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  display: inline-block;
  width: ${(props) => props.width || '2rem'};
  height: ${(props) => props.height || '2rem'};
  line-height: ${(props) => props.height || '2rem'};
  margin-right: 0.5rem;
  border: 1px solid grey;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  &:checked + label {
    background-color: #6055CD;
    color: white;
  }
`;

const CheckBoxLabel = ({ id, text, onChange, width }) => {
  return (
    <>
      <Input id={id} type='checkbox' hidden onChange={onChange}></Input>
      <Label htmlFor={id} width={width}>
        {text}
      </Label>
    </>
  );
};

export default CheckBoxLabel;
