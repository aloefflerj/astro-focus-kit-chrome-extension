import { createContext, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { IContext, IAuthProvider } from './types';
import { loginRequest, registerRequest } from './utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useLocalStorage('user', null);

  async function authenticate(email: string, password: string) {
    const response = await loginRequest(email, password);

    const payload = { token: response.token, email };
    setUser(payload);
  }

  async function register(
    name: string,
    email: string,
    password: string,
    confirmation: string
  ) {
    const response = await registerRequest(name, email, password, confirmation);
    return response;
  }

  async function logout() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      ...user,
      authenticate,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
