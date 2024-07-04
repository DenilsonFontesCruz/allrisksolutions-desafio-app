import styled from 'styled-components';
import {useEffect} from 'react';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export default ({isOpen, closeModal, children}: IModalProps) => {

  useEffect(() => {
    document.addEventListener('keydown', escClose);
  }, [escClose]);

  function handleClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function escClose(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  return isOpen ? (
      <ModalStyle
          onClick={(e) => {
            handleClick(e);
          }}>
        {children}
      </ModalStyle>
  ) : (
      <></>
  );
}

const ModalStyle = styled.div`
  display: grid;
  padding: 2rem;
  box-sizing: border-box;
  align-content: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.50);
  backdrop-filter: blur(5px);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: auto;
`;