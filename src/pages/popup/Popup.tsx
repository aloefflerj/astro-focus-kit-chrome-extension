import { ProtectedLayout } from '@src/components/Layouts/ProtectedLayout';
import { AuthProvider } from '@src/contexts/AuthProvider';
import { Login } from './Login/Login';
import style from './Popup.module.scss';

const Popup = () => {
  return (
    <AuthProvider>
      <div className={style.popup}>
        <ProtectedLayout redirect={<Login />}>
          <p>Protected Layout</p>
        </ProtectedLayout>
      </div>
    </AuthProvider>
  );
};

export default Popup;
