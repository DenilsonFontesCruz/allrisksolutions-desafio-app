import Input, {IValidation} from '../base/Input.tsx';
import Title from './Title.tsx';
import {Button} from '../base/Button.tsx';

interface LoginProps {
  values: {
    username: string;
    password: string;
  };
  validations: {
    username: IValidation;
    password: IValidation;
  };
  changeValues: {
    username: (value: string) => void;
    password: (value: string) => void;
  };
  buttonsActions: {
    changeToRegister: () => void;
    submit: () => void;
  };
}

export default ({values, validations, changeValues, buttonsActions}: LoginProps) => {
  return (
      <>
        <Title>{'Login'}</Title>
        <Input validation={validations.username} changeValue={changeValues.username}
               value={values.username}
               $gridArea="username"
               type="text"
               placeholder="Username"/>
        <Input validation={validations.password} changeValue={changeValues.password}
               value={values.password}
               $gridArea="password"
               type="password" placeholder="Password"/>
        <Button $gridArea="secundaryBtn" onClick={() => buttonsActions.changeToRegister()}>Sign
          Up</Button>
        <Button $gridArea="primaryBtn" $primary={true} onClick={() => buttonsActions.submit()}>Sign
          In</Button>
      </>
  );
}