import { useSessionsApi } from '@src/services/sessions/useSessionsApi';
import { useEffect, useState } from 'react';

export const FocusLayout = ({
  children,
  redirect,
}: {
  children: JSX.Element;
  redirect: JSX.Element;
}) => {
  const [sessionStatus, setSessionStatus] = useState('focusing');
  const { fetchSessionStatus } = useSessionsApi();

  useEffect(() => {
    fetchSessionStatus().then(({ status }) => setSessionStatus(status));
  }, ['sessionStatus']);

  if (sessionStatus !== 'focusing') {
    return redirect;
  }

  return children;
};
