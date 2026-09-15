import { Link } from "react-router-dom";

import { useSelector } from "react-redux";


const Sidebar = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    if (!user) {
        return null;
    }


    return (

        <aside className="w-64 min-h-[calc(100vh-64px)] bg-base-200 p-4">

            <h2 className="text-lg font-bold mb-6">
                Dashboard
            </h2>


            <ul className="menu gap-2">

                {user.role === "PATIENT" && (
                <>
                    <li>
                        <Link to="/patient/dashboard">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/patient/medical-records">
                            Medical Records
                        </Link>
                    </li>

                    <li>
                        <Link to="/patient/appointments">
                            Appointments
                        </Link>
                    </li>

                    <li>
                        <Link to="/patient/referrals">
                            Referrals
                        </Link>
                    </li>
                </>
            )}


                {user.role === "HEALTH_WORKER" && (
                    <>
                        <li>
                            <Link to="/healthworker/dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to="/healthworker/dashboard">
                                Register Patient
                            </Link>
                        </li>

                        <li>
                            <Link to="/healthworker/dashboard">
                                Patients
                            </Link>
                        </li>

                        <li>
                            <Link to="/healthworker/dashboard">
                                AI Triage
                            </Link>
                        </li>
                    </>
                )}


                {user.role === "DOCTOR" && (
                    <>
                        <li>
                            <Link to="/doctor/dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctor/queue">
                                Patient Queue
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctor/medical-records">
                                Medical Records
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctor/referrals">
                                Referrals
                            </Link>
                        </li>
                    </>
                )}


                {user.role === "ADMIN" && (
                    <>
                        <li>
                            <Link to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/dashboard">
                                Facilities
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/dashboard">
                                Users
                            </Link>
                        </li>

                        <li>
                            <Link to="/admin/dashboard">
                                Reports
                            </Link>
                        </li>
                    </>
                )}

            </ul>

        </aside>
    );
};


export default Sidebar;