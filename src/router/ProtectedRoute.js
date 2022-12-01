import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';
import DataLoadingSpinner from '../component/Loader/DataLoadingSpinner';
function ProtectedRoute({ children }) {
    const { setLoading, user, loading } = useContext(AuthContext);

    if (loading) {
        setTimeout(() => {
            setLoading(false);
        }, 3500);
        return (
            <DataLoadingSpinner />
        )
    }
    if (!user) {
        return <Navigate to='/login' />
    }
    if (user) {
        return children;
    }
}

export default ProtectedRoute;