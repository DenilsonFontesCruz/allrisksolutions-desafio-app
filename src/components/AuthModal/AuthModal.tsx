import {AuthContext} from '../../contexts/AuthContext.tsx';
import {useContext, useEffect, useState} from 'react';
import Modal from '../base/Modal.tsx';
import styled from 'styled-components';
import Container from '../base/Container.tsx';
import {IValidation} from '../base/Input.tsx';
import RegisterForm from './RegisterForm.tsx';
import LoginForm from './LoginForm.tsx';
import ResponseModal from '../base/ResponseModal.tsx';
import {Button} from '../base/Button.tsx';


export default () => {
  const auth = useContext(AuthContext);
  const [isOpenResponseModal, setIsOpenResponseModal] = useState<boolean>(false);

  useEffect(() => {
    changeClear();
  }, [auth.authModal.status]);

  useEffect(() => {
    setIsOpenResponseModal(false)
  }, [auth.authModal.status]);

  const [username, setUsername] = useState<string>('');
  const [validationUsername, setValidationUsername] = useState<IValidation>({
    isInvalid: false,
    message: ''
  });

  const [password, setPassword] = useState<string>('');
  const [validationPassword, setValidationPassword] = useState<IValidation>({
    isInvalid: false,
    message: ''
  });

  function register(): void {
    if (!verifyFields()) {
      return;
    }
    setIsOpenResponseModal(true);
    auth.register(username, password);
  }

  function login(): void {
    if (!verifyFields()) {
      return;
    }
    setIsOpenResponseModal(true);
    auth.login(username, password);
  }

  function changeClear(): void {
    setUsername('');
    setPassword('');
    setValidationUsername({
      isInvalid: false,
      message: ''
    });
    setValidationPassword({
      isInvalid: false,
      message: ''
    });
  }

  function verifyFields(): boolean {
    if (!username || !password) {
      setValidationUsername({isInvalid: true, message: 'Username is required.'});
      setValidationPassword({isInvalid: true, message: 'Password is required.'});
      return false;
    }
    if (validationUsername.isInvalid || validationPassword.isInvalid) {
      return false;
    }
    return true;
  }

  function changeUsername(value: string): void {
    setValidationUsername({
      isInvalid: false,
      message: ''
    });
    if (value.length < 3 || value.length > 40) {
      setValidationUsername({
        isInvalid: true,
        message: 'Username must have between 3 and 40 characters.'
      });
    }
    setUsername(value);
  }

  function changePassword(value: string): void {
    setValidationPassword({
      isInvalid: false,
      message: ''
    });
    if (value.length < 8 || value.length > 64) {
      setValidationPassword({
        isInvalid: true,
        message: 'Password must have between 8 and 64 characters.'
      });
    }
    setPassword(value);
  }

  function closeResponseModal(): void {
    setIsOpenResponseModal(false);
  }

  return (
      <Modal isOpen={auth.authModal.status.isOpen} closeModal={auth.authModal.closeAuthModal}>

        <Container $background="rgba(255, 255, 255, 0.6)">
          <AuthStyle>

            {auth.authModal.status.isRegisterForm ? (
                <RegisterForm values={{username, password}} validations={{
                  username: validationUsername,
                  password: validationPassword
                }} changeValues={{username: changeUsername, password: changePassword}}
                              buttonsActions={{
                                changeToLogin: auth.authModal.openAuthLoginModal,
                                submit: register
                              }}/>
            ) : (<>
                  <LoginForm values={{username, password}} validations={{
                    username: validationUsername,
                    password: validationPassword
                  }} changeValues={{username: changeUsername, password: changePassword}}
                             buttonsActions={{
                               changeToRegister: auth.authModal.openAuthRegisterModal,
                               submit: login
                             }}/>
                </>
            )}
            <Button onClick={auth.authModal.closeAuthModal} $gridArea={'closeBtn'}>Close</Button>
          </AuthStyle>
        </Container>
        {isOpenResponseModal && <ResponseModal title={'Response'} isOpen={true}
                                               closeModal={auth.authModal.closeAuthModal}>{auth.response}</ResponseModal>}
      </Modal>
  )
      ;
};

const AuthStyle = styled.div`
  display: grid;
  padding: 3rem;
  width: 30rem;
  height: 35rem;
  box-sizing: border-box;
  grid-template: 
  "title title" 1fr
  "username username" 1fr
  "password password" 1fr
  "secundaryBtn primaryBtn" 1fr
  "closeBtn closeBtn" 2rem
  / 1fr 1fr;
  gap: 2rem;
`;
