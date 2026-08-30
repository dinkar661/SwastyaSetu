import {
    NavLink
} from "react-router-dom";

import {
    useSelector
} from "react-redux";


const Sidebar = () => {

    const user =
        useSelector(
            (state) => state.auth.user
        );


    if (!user) {
        return null;
    }


    const role = user.role;


    const linkClass = ({ isActive }) =>
        `block p-3 rounded-lg ${
            isActive
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200"
        }`;


    return (

        <aside className="w-64 min-h-screen bg-base-100 border-r p-4">

            <h2 className="font-bold text-lg mb-5">
                Menu
            </h2>


            {role === "PATIENT" && (

                <>

                    <NavLink
                        to="/patient/dashboard"
                        className={linkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/patient/records"
                        className={linkClass}
                    >
                        My Records
                    </NavLink>

                    <NavLink
                        to="/patient/appointments"
                        className={linkClass}
                    >
                        Appointments
                    </NavLink>

                    <NavLink
                        to="/patient/referrals"
                        className={linkClass}
                    >
                        Referrals
                    </NavLink>

                </>
            )}


            {role === "HEALTH_WORKER" && (

                <>

                    <NavLink
                        to="/worker/dashboard"
                        className={linkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/worker/register-patient"
                        className={linkClass}
                    >
                        Register Patient
                    </NavLink>

                    <NavLink
                        to="/worker/patients"
                        className={linkClass}
                    >
                        Patients
                    </NavLink>

                    <NavLink
                        to="/worker/triage"
                        className={linkClass}
                    >
                        AI Triage
                    </NavLink>

                    <NavLink
                        to="/worker/referrals"
                        className={linkClass}
                    >
                        Referrals
                    </NavLink>

                </>
            )}


            {role === "DOCTOR" && (

                <>

                    <NavLink
                        to="/doctor/dashboard"
                        className={linkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/doctor/queue"
                        className={linkClass}
                    >
                        Queue
                    </NavLink>

                    <NavLink
                        to="/doctor/referrals"
                        className={linkClass}
                    >
                        Referrals
                    </NavLink>

                </>
            )}


            {role === "ADMIN" && (

                <>

                    <NavLink
                        to="/admin/dashboard"
                        className={linkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/facilities"
                        className={linkClass}
                    >
                        Facilities
                    </NavLink>

                    <NavLink
                        to="/admin/analytics"
                        className={linkClass}
                    >
                        Analytics
                    </NavLink>

                </>
            )}

        </aside>
    );
};


export default Sidebar;