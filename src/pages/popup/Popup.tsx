import { AuthProvider } from '@src/contexts/AuthProvider';
import { Login } from './Login/Login';
import style from './Popup.module.scss';

const Popup = () => {
  return (
    <AuthProvider>
      <div className={style.popup}>
        <Login />
      </div>
    </AuthProvider>
  );
};

export default Popup;
