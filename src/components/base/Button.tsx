import {ReactNode} from 'react';
import styled from 'styled-components';


interface IButtonProps {
  children: ReactNode;
  onClick: () => void;
  $gridArea?: string;
  $primary?: boolean;
}

export const Button = ({onClick, $gridArea, $primary, children}: IButtonProps) => {
  function handleClick() {
    onClick();
  }

  return <ButtonStyled $gridArea={$gridArea} $primary={$primary || false} onClick={() => {
    handleClick();
  }}>{children}</ButtonStyled>;
};

const ButtonStyled = styled.button<{ $gridArea?: string, $primary: boolean }>`
  grid-area: ${({$gridArea}) => $gridArea || 'auto'};
  border-radius: 5px;
  border: none;
  font-size: 1.5rem;

  ${({$primary}) => $primary ? `
    background-color: #007bff;
    color: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    
    &:hover {
      cursor: pointer;
      box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease-in-out;
      transform: scale(1.04);
      filter: brightness(1.2);
    }
  ` : `
    background: none;
    border: none;
    transition: all 0.3s ease-in-out;
    color: #fff;
    font-weight: bold;
    
    &:hover {
      cursor: pointer;
      text-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      transform: scale(1.04);
      color: #007bff;
      filter: brightness(1.4);
    }
  `}
`;
