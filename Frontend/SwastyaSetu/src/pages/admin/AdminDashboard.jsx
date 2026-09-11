import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";


const AdminDashboard = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold">
                        Government / Admin Dashboard
                    </h1>


                    <p className="mt-2 opacity-70">
                        Welcome, {user?.name}
                    </p>


                    <div className="grid md:grid-cols-4 gap-6 mt-6">


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Total Patients
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Doctors
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Health Workers
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Facilities
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 gap-6 mt-8">


                        <div className="card bg-base-100 shadow">

                            <div className="card-body">

                                <h2 className="card-title">
                                    Healthcare Activity
                                </h2>

                                <p>
                                    Monitor consultations,
                                    appointments and patient
                                    registrations.
                                </p>

                            </div>

                        </div>


                        <div className="card bg-base-100 shadow">

                            <div className="card-body">

                                <h2 className="card-title">
                                    Referral Monitoring
                                </h2>

                                <p>
                                    Track referrals between
                                    rural health facilities
                                    and higher hospitals.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};


export default AdminDashboard;