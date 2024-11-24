import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !user.email?.endsWith('@admin.mangaflix.com')) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;