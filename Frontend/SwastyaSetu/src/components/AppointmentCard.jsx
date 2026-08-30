const AppointmentCard = ({
    appointment
}) => {

    return (

        <div className="card bg-base-100 shadow-md">

            <div className="card-body">

                <div className="flex justify-between">

                    <h2 className="card-title">
                        Token #{appointment.tokenNumber}
                    </h2>

                    <span className="badge badge-primary">
                        {appointment.status}
                    </span>

                </div>

                <p>
                    Patient:
                    {" "}
                    {appointment.patientId?.name ||
                        "N/A"}
                </p>

                <p>
                    Date:
                    {" "}
                    {new Date(
                        appointment.date
                    ).toLocaleString()}
                </p>

                <p>
                    Type:
                    {" "}
                    {appointment.type}
                </p>

            </div>

        </div>
    );
};


export default AppointmentCard;