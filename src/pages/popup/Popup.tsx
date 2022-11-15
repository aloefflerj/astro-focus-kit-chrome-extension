import { queryClient } from '@src/common/utils/queryClient';
import { ProtectedLayout } from '@src/components/Layouts/ProtectedLayout';
import { AuthProvider } from '@src/contexts/AuthProvider';
import { checksJWT } from '@src/services/jwt';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import style from './Popup.module.scss';

const Popup = () => {
  useEffect(() => {
    chrome.storage.sync.get(['user'], function (result) {
      const user = result.user !== undefined ? result.user : null;
      localStorage.setItem('user', JSON.stringify(user));
      checksJWT();
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className={style.popup}>
          <ProtectedLayout redirect={<Login />}>
            <Home />
          </ProtectedLayout>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Popup;
