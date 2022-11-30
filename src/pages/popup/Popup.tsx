import { queryClient } from '@src/common/utils/queryClient';
import { FocusLayout } from '@src/components/Layouts/FocusLayout';
import { ProtectedLayout } from '@src/components/Layouts/ProtectedLayout';
import { AuthProvider } from '@src/contexts/AuthProvider';
import { syncLocalStorage } from '@src/services/storage/storage';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Timer } from './pages/Timer/Timer';
import style from './Popup.module.scss';

const Popup = () => {
  useEffect(() => {
    syncLocalStorage();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className={style.popup}>
          <ProtectedLayout redirect={<Login />}>
            <FocusLayout redirect={<Timer />}>
              <Home />
            </FocusLayout>
          </ProtectedLayout>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Popup;
