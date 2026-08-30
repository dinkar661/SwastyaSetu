import {
    useEffect,
    useState
} from "react";

import appointmentService
    from "../../services/appointmentService";


const MyAppointments = () => {

    const [appointments, setAppointments] =
        useState([]);


    useEffect(() => {

        const load =
            async () => {

                try {

                    const data =
                        await appointmentService
                            .getMyAppointments();

                    setAppointments(data);

                } catch (error) {

                    console.error(error);

                }
            };


        load();

    }, []);


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Appointments
            </h1>


            <div className="space-y-4">

                {appointments.map(
                    (appointment) => (

                        <div
                            key={appointment._id}
                            className="card bg-base-100 shadow p-5"
                        >

                            <h2 className="font-bold">
                                Token #
                                {appointment.tokenNumber}
                            </h2>

                            <p>
                                {new Date(
                                    appointment.date
                                ).toLocaleString()}
                            </p>

                            <span className="badge badge-primary mt-2">
                                {appointment.status}
                            </span>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};


export default MyAppointments;