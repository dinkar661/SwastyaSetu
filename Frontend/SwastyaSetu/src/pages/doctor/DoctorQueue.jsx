import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    getDoctorQueue
} from "../../services/appointmentService";


const DoctorQueue = () => {

    const [queue, setQueue] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadQueue = async () => {

            try {

                setLoading(true);

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

                setError(
                    error.response?.data?.message ||
                    "Unable to load patient queue."
                );

            } finally {

                setLoading(false);

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
                        Patient Queue
                    </h1>

                    <p className="mt-2 opacity-70">
                        Manage today's patient appointments
                    </p>


                    {error && (

                        <div className="alert alert-error mt-6">
                            {error}
                        </div>

                    )}


                    <div className="bg-base-100 rounded-box shadow mt-8 p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Today's Patients
                        </h2>


                        {loading ? (

                            <p>
                                Loading queue...
                            </p>

                        ) : queue.length === 0 ? (

                            <p className="opacity-60">
                                No patients in queue.
                            </p>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="table">

                                    <thead>

                                        <tr>

                                            <th>Token</th>

                                            <th>Patient</th>

                                            <th>Reason</th>

                                            <th>Status</th>

                                            <th>Appointment</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {queue.map((item) => (

                                            <tr key={item._id}>

                                                <td>
                                                    <strong>
                                                        {item.tokenNumber || "-"}
                                                    </strong>
                                                </td>


                                                <td>
                                                    {item.patient?.name ||
                                                        item.patientName ||
                                                        "-"}
                                                </td>


                                                <td>
                                                    {item.reason || "-"}
                                                </td>


                                                <td>

                                                    <span className="badge badge-info">
                                                        {item.status ||
                                                            "WAITING"}
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


export default DoctorQueue;