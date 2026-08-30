import {
    useEffect,
    useState
} from "react";

import {
    useSelector
} from "react-redux";

import medicalRecordService
    from "../../services/medicalRecordService";


const MyRecords = () => {

    const user =
        useSelector(
            (state) => state.auth.user
        );


    const [records, setRecords] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const loadRecords =
            async () => {

                try {

                    const data =
                        await medicalRecordService
                            .getPatientRecords(
                                user.patientId ||
                                user._id
                            );

                    setRecords(data);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);
                }
            };


        if (user) {
            loadRecords();
        }

    }, [user]);


    if (loading) {
        return <p>Loading records...</p>;
    }


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Medical Records
            </h1>


            <div className="space-y-4">

                {records.map(
                    (record) => (

                        <div
                            key={record._id}
                            className="card bg-base-100 shadow p-6"
                        >

                            <h2 className="text-xl font-bold">
                                {record.diagnosis}
                            </h2>

                            <p>
                                Symptoms:
                                {" "}
                                {record.symptoms}
                            </p>

                            <p>
                                Prescription:
                                {" "}
                                {record.prescription}
                            </p>

                            <p>
                                Notes:
                                {" "}
                                {record.notes}
                            </p>

                            <p className="text-sm text-gray-500 mt-2">
                                {new Date(
                                    record.createdAt
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    )
                )}

            </div>

        </div>
    );
};


export default MyRecords;