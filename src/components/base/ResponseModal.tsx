import styled from 'styled-components';
import {ReactNode} from 'react';
import Container from './Container.tsx';
import Modal from './Modal.tsx';
import {Button} from './Button.tsx';

interface ResponseProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}

export default ({title, isOpen, closeModal, children}: ResponseProps) => {
  return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Container $background="rgba(255, 255, 255, 0.6)">
          <TitleStyle>{title}</TitleStyle>
          <ResponseStyle>
            {children}
            <Button onClick={() => {
              closeModal();
            }}>Close</Button>
          </ResponseStyle>
        </Container>
      </Modal>
  );
}

const ResponseStyle = styled.div`
  display: grid;
  grid-template:
      1fr 2rem / 1fr;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 2rem 1rem 2rem;
  box-sizing: border-box;
  position: relative;
  
  font-size: 1.2rem;
  font-family: 'Cantarell', sans-serif;
`;

const TitleStyle = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Cantarell', sans-serif;
  text-transform: uppercase;
  width: 100%;
  max-height: 4rem;
  box-sizing: border-box;
`;