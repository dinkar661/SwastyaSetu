import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "../pages/Login";
import Signup from "../pages/Signup";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

import PatientDashboard
    from "../pages/patient/PatientDashboard";

import HealthWorkerDashboard
    from "../pages/healthworker/HealthWorkerDashboard";

import DoctorDashboard
    from "../pages/doctor/DoctorDashboard";

import AdminDashboard
    from "../pages/admin/AdminDashboard";


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


                {/* AUTHENTICATED */}

                <Route element={<ProtectedRoute />}>

                    {/* PATIENT */}

                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "PATIENT"
                                ]}
                            />
                        }
                    >

                        <Route
                            path="/patient/dashboard"
                            element={
                                <PatientDashboard />
                            }
                        />

                    </Route>


                    {/* HEALTH WORKER */}

                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "HEALTH_WORKER"
                                ]}
                            />
                        }
                    >

                        <Route
                            path="/healthworker/dashboard"
                            element={
                                <HealthWorkerDashboard />
                            }
                        />

                    </Route>


                    {/* DOCTOR */}

                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "DOCTOR"
                                ]}
                            />
                        }
                    >

                        <Route
                            path="/doctor/dashboard"
                            element={
                                <DoctorDashboard />
                            }
                        />

                    </Route>


                    {/* ADMIN */}

                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={[
                                    "ADMIN"
                                ]}
                            />
                        }
                    >

                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminDashboard />
                            }
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );
};


export default AppRoutes;