import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
