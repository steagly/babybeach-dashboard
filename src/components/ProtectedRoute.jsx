import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element, loading}) => {
    const { isAuthenticated } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }));

    if (loading) {
        return <div>Loading...</div>;
      }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
