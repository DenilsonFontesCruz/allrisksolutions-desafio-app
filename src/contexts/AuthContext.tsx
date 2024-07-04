import {createContext, ReactNode, useState} from 'react';
import {Auth, IUser} from '../Api/BackendApi';

interface AuthModalStatus {
  isOpen: boolean;
  isRegisterForm: boolean;
}

interface IAuthContextData {
  isAuthenticated: boolean;
  response: string;
  accessToken: string;
  userInfo: IUser;
  authModal: {
    status: AuthModalStatus;
    closeAuthModal: () => void;
    openAuthRegisterModal: () => void;
    openAuthLoginModal: () => void;
  };
  verifyIsAuthenticated: () => void;
  getUserInfo: () => void;
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({children, ...rest}: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>({
    id: '',
    username: '',
    favoriteCities: []
  });
  const [accessToken, setAccessToken] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [authModalStatus, setAuthModalStatus] = useState<AuthModalStatus>({
    isOpen: false,
    isRegisterForm: true
  });

  function verifyIsAuthenticated(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return;
    }
    Auth.setAccessCode(token);
    Auth.getUserInfoRequest().then((response) => {
      setUserInfo(response);
      setIsAuthenticated(true);
    }).catch((err) => {
      setIsAuthenticated(false);
      setAccessToken('');
    });
  }

  function getUserInfo(): void {
    Auth.getUserInfoRequest().then((response) => {
      setUserInfo(response);
    }).catch((err) => {
      console.error(err);
    });
  }

  function register(username: string, password: string): void {
    setResponse('Waiting for response...');
    Auth.registerRequest(username, password).then(() => {
      setResponse('User registered successfully.');
    }).catch((err: Error) => {
      console.error(err);
      setResponse(err.message || 'Failed to register user.');
    });
  }

  function login(username: string, password: string): void {
    setResponse('Waiting for response...');
    Auth.loginRequest(username, password).then((response) => {
      setResponse('User logged in successfully.');
      setIsAuthenticated(true);
      setAccessToken(response);
      localStorage.setItem('accessToken', response);
      Auth.setAccessCode(response);
      verifyIsAuthenticated();
      closeAuthModal();
    }).catch((err: Error) => {
      console.error(err);
      setResponse(err.message || 'Failed to login user.');
    });
  }

  function logout(): void {
    if (!isAuthenticated) {
      setResponse('User is not logged in.');
    }
    Auth.logoutRequest().then(() => {
      setResponse('User logged out successfully.');
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      setAccessToken('');
      setUserInfo({
        id: '',
        username: '',
        favoriteCities: []
      });
      setResponse('User logged out successfully.');
    }).catch(() => {
      setResponse('Failed to logout');
    });
  }

  function closeAuthModal(): void {
    setAuthModalStatus({isOpen: false, isRegisterForm: true});
  }

  function openAuthRegisterModal(): void {
    setAuthModalStatus({isOpen: true, isRegisterForm: true});
  }

  function openAuthLoginModal(): void {
    setAuthModalStatus({isOpen: true, isRegisterForm: false});
  }

  return (
      <AuthContext.Provider value={{
        isAuthenticated,
        response,
        accessToken,
        userInfo,
        authModal: {
          status: authModalStatus,
          closeAuthModal,
          openAuthLoginModal,
          openAuthRegisterModal
        },
        verifyIsAuthenticated,
        getUserInfo,
        register,
        login,
        logout,
      }}>
        {children}
      </AuthContext.Provider>
  );
};

