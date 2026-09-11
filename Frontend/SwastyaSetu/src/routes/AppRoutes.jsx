import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


import ProtectedRoute from "../components/ProtectedRoute";

import RoleRoute from "../components/RoleRoute";


import Login from "../pages/Login";

import Signup from "../pages/Signup";


import PatientDashboard from "../pages/patient/PatientDashboard";

import HealthWorkerDashboard from "../pages/healthworker/HealthWorkerDashboard";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";


const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* ALL AUTHENTICATED USERS */}

                <Route element={<ProtectedRoute />}>


                    {/* PATIENT */}

                    <Route element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        />
                    }>

                        <Route
                            path="/patient/dashboard"
                            element={<PatientDashboard />}
                        />

                    </Route>


                    {/* HEALTH WORKER */}

                    <Route element={
                        <RoleRoute
                            allowedRoles={["HEALTH_WORKER"]}
                        />
                    }>

                        <Route
                            path="/healthworker/dashboard"
                            element={
                                <HealthWorkerDashboard />
                            }
                        />

                    </Route>


                    {/* DOCTOR */}

                    <Route element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        />
                    }>

                        <Route
                            path="/doctor/dashboard"
                            element={<DoctorDashboard />}
                        />

                    </Route>


                    {/* ADMIN */}

                    <Route element={
                        <RoleRoute
                            allowedRoles={["ADMIN"]}
                        />
                    }>

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                    </Route>


                </Route>


                {/* UNAUTHORIZED */}

                <Route
                    path="/unauthorized"
                    element={
                        <div className="min-h-screen flex items-center justify-center">

                            <div className="text-center">

                                <h1 className="text-4xl font-bold">
                                    403
                                </h1>

                                <p>
                                    You are not authorized to access this page.
                                </p>

                            </div>

                        </div>
                    }
                />


                {/* DEFAULT */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* WRONG URL */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
};


export default AppRoutes;