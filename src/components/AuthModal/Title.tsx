import styled from 'styled-components';
import {ReactNode} from 'react';

export default ({children}: { children: ReactNode }) => {
  return (
      <TitleStyle>
        {children}
      </TitleStyle>
  );
}

const TitleStyle = styled.h1`
  grid-area: title;
  align-self: center;
  font-size: 3.5rem;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-family: 'Cantarell', sans-serif;
  box-sizing: border-box;
`;

