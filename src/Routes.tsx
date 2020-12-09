import React, { memo, } from 'react';
import useAuth from './hooks/useAuth';
import AdminitradorOficinaRoutes from './routes/AdministradorOficinaRoutes';
import PublicRoutes from './routes/PublicRoutes';

const Routes: React.FC = () => {
  const { logado } = useAuth();
  return (
    <>
      {
        !logado ? (
          <PublicRoutes />
        )
          : (
            <AdminitradorOficinaRoutes />
          )
      }
    </>
  );
}

export default memo(Routes);