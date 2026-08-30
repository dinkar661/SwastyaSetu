import {
    useEffect,
    useState
} from "react";

import appointmentService
    from "../../services/appointmentService";

import AppointmentCard
    from "../../components/AppointmentCard";


const Queue = () => {

    const [queue, setQueue] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const loadQueue = async () => {

        try {

            const data =
                await appointmentService
                    .getDoctorQueue();

            setQueue(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadQueue();

        const interval =
            setInterval(
                loadQueue,
                30000
            );

        return () =>
            clearInterval(interval);

    }, []);


    if (loading) {
        return <p>Loading queue...</p>;
    }


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Doctor Queue
            </h1>


            <div className="space-y-4">

                {queue.length === 0 ? (

                    <p>
                        No patients waiting.
                    </p>

                ) : (

                    queue.map(
                        (appointment) => (

                            <AppointmentCard
                                key={
                                    appointment._id
                                }
                                appointment={
                                    appointment
                                }
                            />

                        )
                    )

                )}

            </div>

        </div>
    );
};


export default Queue;