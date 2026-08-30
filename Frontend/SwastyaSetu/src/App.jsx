import {Routes,Route,Navigate} from "react-router-dom";


// Layout
import Navbar
    from "./components/Navbar";

import Sidebar
    from "./components/Sidebar";


// Auth
import Login
    from "./pages/auth/Login";

import Register
    from "./pages/auth/Register";


// Patient
import PatientDashboard
    from "./pages/patient/PatientDashboard";

import MyRecords
    from "./pages/patient/MyRecords";

import MyAppointments
    from "./pages/patient/MyAppointments";

import MyReferrals
    from "./pages/patient/MyReferrals";


// Worker
import WorkerDashboard
    from "./pages/worker/WorkerDashboard";

import RegisterPatient
    from "./pages/worker/RegisterPatient";

import Patients
    from "./pages/worker/Patients";

import Triage
    from "./pages/worker/Triage";

import WorkerReferrals
    from "./pages/worker/Referrals";


// Doctor
import DoctorDashboard
    from "./pages/doctor/DoctorDashboard";

import Queue
    from "./pages/doctor/Queue";

import Consultation
    from "./pages/doctor/Consultation";

import DoctorReferrals
    from "./pages/doctor/Referrals";


// Admin
import AdminDashboard
    from "./pages/admin/AdminDashboard";

import Facilities
    from "./pages/admin/Facilities";

import Analytics
    from "./pages/admin/Analytics";


// Protected route
import ProtectedRoute
    from "./routes/ProtectedRoute";


const Layout = () => {

    return (

        <>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-6 bg-base-200 min-h-screen">

                    <Routes>

                        {/* PATIENT */}

                        <Route
                            path="/patient/dashboard"
                            element={
                                <PatientDashboard />
                            }
                        />

                        <Route
                            path="/patient/records"
                            element={
                                <MyRecords />
                            }
                        />

                        <Route
                            path="/patient/appointments"
                            element={
                                <MyAppointments />
                            }
                        />

                        <Route
                            path="/patient/referrals"
                            element={
                                <MyReferrals />
                            }
                        />


                        {/* WORKER */}

                        <Route
                            path="/worker/dashboard"
                            element={
                                <WorkerDashboard />
                            }
                        />

                        <Route
                            path="/worker/register-patient"
                            element={
                                <RegisterPatient />
                            }
                        />

                        <Route
                            path="/worker/patients"
                            element={
                                <Patients />
                            }
                        />

                        <Route
                            path="/worker/triage"
                            element={
                                <Triage />
                            }
                        />

                        <Route
                            path="/worker/referrals"
                            element={
                                <WorkerReferrals />
                            }
                        />


                        {/* DOCTOR */}

                        <Route
                            path="/doctor/dashboard"
                            element={
                                <DoctorDashboard />
                            }
                        />

                        <Route
                            path="/doctor/queue"
                            element={
                                <Queue />
                            }
                        />

                        <Route
                            path="/doctor/consultation"
                            element={
                                <Consultation />
                            }
                        />

                        <Route
                            path="/doctor/referrals"
                            element={
                                <DoctorReferrals />
                            }
                        />


                        {/* ADMIN */}

                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminDashboard />
                            }
                        />

                        <Route
                            path="/admin/facilities"
                            element={
                                <Facilities />
                            }
                        />

                        <Route
                            path="/admin/analytics"
                            element={
                                <Analytics />
                            }
                        />

                    </Routes>

                </main>

            </div>

        </>
    );
};


const App = () => {

    return (

        <Routes>

            {/* PUBLIC */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* PROTECTED */}

            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "PATIENT",
                            "HEALTH_WORKER",
                            "DOCTOR",
                            "ADMIN"
                        ]}
                    />
                }
            >

                <Route
                    path="/*"
                    element={<Layout />}
                />

            </Route>


            {/* DEFAULT */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
};


export default App;