import {
    Link
} from "react-router-dom";


const PatientCard = ({
    patient
}) => {

    return (

        <div className="card bg-base-100 shadow-md">

            <div className="card-body">

                <h2 className="card-title">
                    {patient.name}
                </h2>

                <p>
                    Age: {patient.age}
                </p>

                <p>
                    Gender: {patient.gender}
                </p>

                <p>
                    Phone: {patient.phone}
                </p>

                <div className="card-actions justify-end">

                    <Link
                        to={`/patient/${patient._id}`}
                        className="btn btn-primary btn-sm"
                    >
                        View
                    </Link>

                </div>

            </div>

        </div>
    );
};


export default PatientCard;