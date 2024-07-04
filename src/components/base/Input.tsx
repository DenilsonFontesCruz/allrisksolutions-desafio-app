import styled from 'styled-components';
import {useState} from 'react';
// @ts-ignore
import EyeClosed from '../../assets/eye-closed.svg?react';
// @ts-ignore
import EyeOpen from '../../assets/eye-open.svg?react';

export interface IValidation {
  isInvalid: boolean;
  message: string;
}

interface IInputProps {
  value: string;
  changeValue: (value: string) => void;
  type: string;
  placeholder?: string;
  validation: IValidation;
  $gridArea?: string;
}

export default ({
                  value,
                  changeValue,
                  type,
                  placeholder,
                  validation,
                  $gridArea
                }: IInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
      <InputContainerStyle $gridArea={$gridArea}>
        <InputStyle type={showPassword ? 'text' : type} placeholder={placeholder} value={value}
                    onChange={(e) => changeValue(e.target.value)}
        />
        {(type == 'password') && (
            <ShowHidePasswordStyle onClick={handleShowHidePassword}>
              {showPassword ? <EyeOpen/> : <EyeClosed/>}
            </ShowHidePasswordStyle>)}
        {validation.isInvalid && <ErrorMessage>{validation.message}</ErrorMessage>}
      </InputContainerStyle>
  );
}

const InputContainerStyle = styled.div<{ $gridArea?: string }>`
  grid-area: ${({$gridArea}) => $gridArea || 'auto'};
  display: grid;
  position: relative;
`;

const InputStyle = styled.input`
  border: solid 1px white;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: none;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 1.5rem;
  font-weight: lighter;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: white;
    font-weight: lighter;
  }

  &:focus {
    transition: all 0.3s ease-in-out;
    transform: scale(1.02);
    outline: none;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
`;

const ShowHidePasswordStyle = styled.button`
  display: grid;
  align-content: center;
  position: absolute;
  right: 5px;
  top: calc(50% - 20px);
  background: none;
  outline: none;
  border: none;

  svg {
    width: 40px;
    height: 40px;
    fill: white;
    transition: all 0.3s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.2);
    fill: #555;
    transition: all 0.3s ease-in-out;
  }
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: -1.2rem;
  left: 0.5rem;
  color: #ef2929;
  font-size: 1rem;
  letter-spacing: -1px;
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
`;