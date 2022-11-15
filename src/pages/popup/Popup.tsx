import { ProtectedLayout } from '@src/components/Layouts/ProtectedLayout';
import { AuthProvider } from '@src/contexts/AuthProvider';
import { checksJWT } from '@src/services/jwt';
import { useEffect } from 'react';
import { Login } from './Login/Login';
import style from './Popup.module.scss';

const Popup = () => {
  useEffect(() => {
    chrome.storage.sync.get(['user'], function (result) {
      const user = result.user !== undefined ? result.user : null;
      if (user) localStorage.setItem('user', JSON.stringify(user));
      checksJWT();
    });
  });

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
