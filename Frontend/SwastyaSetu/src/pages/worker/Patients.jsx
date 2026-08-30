import {
    useEffect,
    useState
} from "react";

import patientService
    from "../../services/patientService";

import PatientCard
    from "../../components/PatientCard";


const Patients = () => {

    const [patients, setPatients] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const loadPatients =
            async () => {

                try {

                    const data =
                        await patientService
                            .getPatients();

                    setPatients(data);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };


        loadPatients();

    }, []);


    if (loading) {
        return <p>Loading patients...</p>;
    }


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Patients
            </h1>


            <div className="grid md:grid-cols-3 gap-4">

                {patients.map(
                    (patient) => (

                        <PatientCard
                            key={patient._id}
                            patient={patient}
                        />

                    )
                )}

            </div>

        </div>
    );
};


export default Patients;