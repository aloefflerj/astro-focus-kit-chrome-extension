import { useAuth } from '../../hooks/useAuth';

export const ProtectedLayout = ({
  children,
  redirect,
}: {
  children: JSX.Element;
  redirect: JSX.Element;
}) => {
  const auth = useAuth();

  if (!auth.email) {
    return redirect;
  }

  return children;
};
