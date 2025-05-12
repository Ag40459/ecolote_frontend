import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; 

const ProtectedRoute = () => {
    const { admin, loading } = useAuth();

    if (loading) {
        
        return <div>Verificando autenticação...</div>;
    }

    return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

