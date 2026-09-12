import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getMedicalRecords
} from "../../services/medicalRecordService";


const MedicalRecords = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadRecords = async () => {

            if (!user?.patientId) {

                setError(
                    "Patient profile not found."
                );

                setLoading(false);

                return;
            }


            try {

                const data =
                    await getMedicalRecords(
                        user.patientId
                    );


                const recordList =
                    data.records ||
                    data ||
                    [];


                setRecords(
                    Array.isArray(recordList)
                        ? recordList
                        : []
                );

            }
            catch (error) {

                console.log(
                    "Medical records error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load medical records."
                );

            }
            finally {

                setLoading(false);

            }

        };


        loadRecords();

    }, [user]);


    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold mb-6">
                        Medical Records
                    </h1>


                    {loading && (

                        <div className="flex justify-center">

                            <span className="loading loading-spinner loading-lg"></span>

                        </div>

                    )}


                    {error && (

                        <div className="alert alert-error mb-6">
                            {error}
                        </div>

                    )}


                    {!loading &&
                        !error &&
                        records.length === 0 && (

                            <div className="bg-base-100 p-8 rounded-box shadow text-center">

                                <h2 className="text-xl font-bold">
                                    No Medical Records
                                </h2>

                                <p className="opacity-60 mt-2">
                                    Your medical records will appear here after a consultation.
                                </p>

                            </div>

                        )}


                    <div className="space-y-6">

                        {records.map((record) => (

                            <div
                                key={record._id}
                                className="card bg-base-100 shadow"
                            >

                                <div className="card-body">

                                    <div className="flex justify-between">

                                        <h2 className="card-title">
                                            Medical Visit
                                        </h2>


                                        <span className="badge badge-primary">
                                            {record.visitType ||
                                                "IN_PERSON"}
                                        </span>

                                    </div>


                                    <p className="text-sm opacity-60">

                                        {record.createdAt
                                            ? new Date(
                                                record.createdAt
                                            ).toLocaleDateString()
                                            : "Date not available"}

                                    </p>


                                    <div className="divider"></div>


                                    <div>

                                        <h3 className="font-bold">
                                            Symptoms
                                        </h3>

                                        {record.symptoms &&
                                        record.symptoms.length > 0 ? (

                                            <ul className="list-disc ml-6">

                                                {record.symptoms.map(
                                                    (symptom, index) => (

                                                        <li key={index}>
                                                            {symptom}
                                                        </li>

                                                    )
                                                )}

                                            </ul>

                                        ) : (

                                            <p className="opacity-60">
                                                No symptoms recorded.
                                            </p>

                                        )}

                                    </div>


                                    <div className="mt-4">

                                        <h3 className="font-bold">
                                            Diagnosis
                                        </h3>

                                        <p>
                                            {record.diagnosis ||
                                                "Not available"}
                                        </p>

                                    </div>


                                    <div className="mt-4">

                                        <h3 className="font-bold">
                                            Doctor Notes
                                        </h3>

                                        <p>
                                            {record.notes ||
                                                "No notes available."}
                                        </p>

                                    </div>


                                    {record.prescription &&
                                        record.prescription.length > 0 && (

                                        <div className="mt-4">

                                            <h3 className="font-bold mb-2">
                                                Prescription
                                            </h3>


                                            <div className="overflow-x-auto">

                                                <table className="table">

                                                    <thead>

                                                        <tr>

                                                            <th>Medicine</th>

                                                            <th>Dosage</th>

                                                            <th>Duration</th>

                                                        </tr>

                                                    </thead>


                                                    <tbody>

                                                        {record.prescription.map(
                                                            (medicine, index) => (

                                                                <tr key={index}>

                                                                    <td>
                                                                        {medicine.medicine}
                                                                    </td>

                                                                    <td>
                                                                        {medicine.dosage}
                                                                    </td>

                                                                    <td>
                                                                        {medicine.duration}
                                                                    </td>

                                                                </tr>

                                                            )
                                                        )}

                                                    </tbody>

                                                </table>

                                            </div>

                                        </div>

                                    )}


                                </div>

                            </div>

                        ))}

                    </div>

                </main>

            </div>

        </div>
    );
};


export default MedicalRecords;