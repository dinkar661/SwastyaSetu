import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getDoctorQueue,
} from "../../services/appointmentService";


const DoctorDashboard = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    const [queue, setQueue] = useState([]);


    useEffect(() => {

        const loadQueue = async () => {

            try {

                const data =
                    await getDoctorQueue();


                const queueData =
                    data.appointments ||
                    data.queue ||
                    data ||
                    [];


                setQueue(
                    Array.isArray(queueData)
                        ? queueData
                        : []
                );

            } catch (error) {

                console.log(
                    "Doctor queue error:",
                    error
                );

            }

        };


        loadQueue();

    }, []);


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold">
                        Doctor Dashboard
                    </h1>


                    <p className="mt-2 opacity-70">
                        Welcome, Dr. {user?.name}
                    </p>


                    <div className="grid md:grid-cols-3 gap-6 mt-6">

                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Patient Queue
                            </div>

                            <div className="stat-value">
                                {queue.length}
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Consultations
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
                            Patient Queue
                        </h2>


                        {queue.length === 0 ? (

                            <p className="opacity-60">
                                No patients in queue.
                            </p>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="table">

                                    <thead>

                                        <tr>

                                            <th>Patient</th>

                                            <th>Status</th>

                                            <th>Appointment</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {queue.map((item) => (

                                            <tr key={item._id}>

                                                <td>
                                                    {item.patient?.name ||
                                                        item.patientName ||
                                                        "-"}
                                                </td>

                                                <td>
                                                    <span className="badge badge-info">
                                                        {item.status ||
                                                            "PENDING"}
                                                    </span>
                                                </td>

                                                <td>
                                                    {item.date
                                                        ? new Date(
                                                            item.date
                                                        ).toLocaleString()
                                                        : "-"}
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


export default DoctorDashboard;