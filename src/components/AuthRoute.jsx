import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ element }) => {
    const { isAuthenticated } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }));
    return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};

export default AuthRoute;