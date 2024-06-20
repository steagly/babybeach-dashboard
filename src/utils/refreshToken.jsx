import axios from 'axios';
import useAuthStore from '../store/authStore';

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('http://localhost:5001/api/auth/refresh', {}, { withCredentials: true });
        const newAccessToken = response.data.accessToken;
        
        if (newAccessToken) {
            useAuthStore.setState({ isAuthenticated: true, accessToken: newAccessToken });
        } else {
            throw new Error('Failed to refresh access token', response);
        }
    } catch (error) {
        console.error('Error refreshing access token', error);
        useAuthStore.setState({ isAuthenticated: false, accessToken: null });
    }
};