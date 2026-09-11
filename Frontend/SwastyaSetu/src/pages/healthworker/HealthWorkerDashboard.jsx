import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getPatients,
} from "../../services/patientService";


const HealthWorkerDashboard = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    const [patients, setPatients] = useState([]);


    useEffect(() => {

        const loadPatients = async () => {

            try {

                const data =
                    await getPatients();


                const patientList =
                    data.patients ||
                    data ||
                    [];


                setPatients(
                    Array.isArray(patientList)
                        ? patientList
                        : []
                );

            } catch (error) {

                console.log(
                    "Patient loading error:",
                    error
                );

            }

        };


        loadPatients();

    }, []);


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold">
                        Health Worker Dashboard
                    </h1>


                    <p className="mt-2 opacity-70">
                        Welcome, {user?.name}
                    </p>


                    <div className="grid md:grid-cols-3 gap-6 mt-6">

                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Registered Patients
                            </div>

                            <div className="stat-value">
                                {patients.length}
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Today's Queue
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Referrals
                            </div>

                            <div className="stat-value">
                                0
                            </div>

                        </div>

                    </div>


                    <div className="bg-base-100 rounded-box shadow mt-8 p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Recent Patients
                        </h2>


                        {patients.length === 0 ? (

                            <p className="opacity-60">
                                No patients found.
                            </p>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="table">

                                    <thead>

                                        <tr>

                                            <th>Name</th>

                                            <th>Age</th>

                                            <th>Gender</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {patients
                                            .slice(0, 10)
                                            .map((patient) => (

                                                <tr
                                                    key={patient._id}
                                                >

                                                    <td>
                                                        {patient.name}
                                                    </td>

                                                    <td>
                                                        {patient.age || "-"}
                                                    </td>

                                                    <td>
                                                        {patient.gender || "-"}
                                                    </td>

                                                </tr>

                                            ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};


export default HealthWorkerDashboard;