import { Navigate } from 'react-router-dom';

export const ProtectedRoute = props => {
  if (!props.user) {
    return <Navigate to="/" replace />;
  }
  return props.children;
};
