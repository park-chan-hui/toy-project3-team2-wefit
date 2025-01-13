import { Navigate, useLocation } from 'react-router-dom';

import Spinner from '@/components/common/spinner/Spinner';
import { useUsers } from '@/hooks/useUsers';
import { ROUTER_PATH } from '@/constants/constants';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUserQuery } = useUsers();
  const location = useLocation();

  if (currentUserQuery.isLoading) {
    return <Spinner />;
  }

  if (!currentUserQuery.data) {
    return (
      <Navigate to={ROUTER_PATH.LOGIN} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
