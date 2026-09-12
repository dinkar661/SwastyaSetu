import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getMyAppointments,
    createAppointment
} from "../../services/appointmentService";


const Appointments = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    const [appointments, setAppointments] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    const [message, setMessage] =
        useState("");


    const [formData, setFormData] = useState({
        doctorId: "",
        facilityId: "",
        date: "",
        type: "IN_PERSON",
        reason: ""
    });


    const loadAppointments = async () => {

        try {

            setLoading(true);

            const data =
                await getMyAppointments();


            const appointmentList =
                data.appointments ||
                data ||
                [];


            setAppointments(
                Array.isArray(appointmentList)
                    ? appointmentList
                    : []
            );

        }
        catch (error) {

            console.log(
                "Appointments error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load appointments."
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAppointments();

    }, []);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMessage("");


        try {

            await createAppointment({

                patientId: user.patientId,

                doctorId: formData.doctorId,

                facilityId:
                    formData.facilityId || undefined,

                date: formData.date,

                type: formData.type,

                reason: formData.reason

            });


            setMessage(
                "Appointment booked successfully."
            );


            setFormData({
                doctorId: "",
                facilityId: "",
                date: "",
                type: "IN_PERSON",
                reason: ""
            });


            loadAppointments();

        }
        catch (error) {

            console.log(
                "Appointment booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to book appointment."
            );

        }

    };


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold mb-6">
                        Appointments
                    </h1>


                    {message && (

                        <div className="alert alert-success mb-6">
                            {message}
                        </div>

                    )}


                    {error && (

                        <div className="alert alert-error mb-6">
                            {error}
                        </div>

                    )}


                    {/* BOOK APPOINTMENT */}

                    <div className="card bg-base-100 shadow mb-8">

                        <div className="card-body">

                            <h2 className="card-title">
                                Book Appointment
                            </h2>


                            <form
                                onSubmit={handleSubmit}
                                className="grid md:grid-cols-2 gap-4 mt-4"
                            >

                                <input
                                    type="text"
                                    name="doctorId"
                                    placeholder="Doctor ID"
                                    className="input input-bordered"
                                    value={formData.doctorId}
                                    onChange={handleChange}
                                    required
                                />


                                <input
                                    type="text"
                                    name="facilityId"
                                    placeholder="Facility ID (optional)"
                                    className="input input-bordered"
                                    value={formData.facilityId}
                                    onChange={handleChange}
                                />


                                <input
                                    type="datetime-local"
                                    name="date"
                                    className="input input-bordered"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />


                                <select
                                    name="type"
                                    className="select select-bordered"
                                    value={formData.type}
                                    onChange={handleChange}
                                >

                                    <option value="IN_PERSON">
                                        In Person
                                    </option>

                                    <option value="TELECONSULTATION">
                                        Teleconsultation
                                    </option>

                                </select>


                                <textarea
                                    name="reason"
                                    placeholder="Reason for appointment"
                                    className="textarea textarea-bordered md:col-span-2"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                />


                                <button
                                    type="submit"
                                    className="btn btn-primary md:col-span-2"
                                >
                                    Book Appointment
                                </button>

                            </form>

                        </div>

                    </div>


                    {/* APPOINTMENT LIST */}

                    <div className="card bg-base-100 shadow">

                        <div className="card-body">

                            <h2 className="card-title mb-4">
                                My Appointments
                            </h2>


                            {loading ? (

                                <div className="flex justify-center">

                                    <span className="loading loading-spinner loading-lg"></span>

                                </div>

                            ) : appointments.length === 0 ? (

                                <p className="opacity-60">
                                    No appointments found.
                                </p>

                            ) : (

                                <div className="overflow-x-auto">

                                    <table className="table">

                                        <thead>

                                            <tr>

                                                <th>Date</th>

                                                <th>Type</th>

                                                <th>Token</th>

                                                <th>Status</th>

                                                <th>Reason</th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {appointments.map(
                                                (appointment) => (

                                                    <tr
                                                        key={
                                                            appointment._id
                                                        }
                                                    >

                                                        <td>

                                                            {appointment.date
                                                                ? new Date(
                                                                    appointment.date
                                                                ).toLocaleString()
                                                                : "-"}

                                                        </td>


                                                        <td>

                                                            {appointment.type ||
                                                                "IN_PERSON"}

                                                        </td>


                                                        <td>

                                                            {appointment.tokenNumber ||
                                                                "-"}

                                                        </td>


                                                        <td>

                                                            <span className="badge badge-info">

                                                                {appointment.status}

                                                            </span>

                                                        </td>


                                                        <td>

                                                            {appointment.reason ||
                                                                "-"}

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};


export default Appointments;