import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";


const ProtectedRoute = () => {

    const {
        isAuthenticated,
        initializing,
    } = useSelector((state) => state.auth);


    // Wait for /auth/me
    if (initializing) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }


    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return <Outlet />;
};


export default ProtectedRoute;