import { AxiosError } from 'axios';
import { IUser } from '../../common/types';

export interface ILoading {
  pending: boolean;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmation: string
  ) => Promise<AxiosError>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
