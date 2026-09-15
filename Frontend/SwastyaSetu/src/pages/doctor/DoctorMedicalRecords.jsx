import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    getMedicalRecords,
    createMedicalRecord
} from "../../services/medicalRecordService";


const DoctorMedicalRecords = () => {

    const [patientId, setPatientId] = useState("");

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        diagnosis: "",
        symptoms: "",
        prescription: "",
        notes: "",
        testResults: "",
        followUpDate: ""

    });


    const searchRecords = async () => {

        if (!patientId) {

            setError("Please enter patient ID.");

            return;
        }

        try {

            setError("");

            setLoading(true);

            const data =
                await getMedicalRecords(patientId);

            setRecords(
                data.records ||
                data ||
                []
            );

        } catch (error) {

            console.log(
                "Medical records error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load medical records."
            );

        } finally {

            setLoading(false);

        }
    };


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const data = await createMedicalRecord({

                patientId,

                diagnosis: form.diagnosis,

                symptoms: form.symptoms,

                prescription: form.prescription,

                notes: form.notes,

                testResults: form.testResults,

                followUpDate:
                    form.followUpDate || null

            });


            alert(
                "Medical record created successfully"
            );


            setRecords([
                data.record,
                ...records
            ]);


            setForm({

                diagnosis: "",
                symptoms: "",
                prescription: "",
                notes: "",
                testResults: "",
                followUpDate: ""

            });

        } catch (error) {

            console.log(
                "Create medical record error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create medical record."
            );

        }
    };


    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold">
                        Medical Records
                    </h1>

                    <p className="mt-2 opacity-70">
                        View and create patient medical records
                    </p>


                    {error && (

                        <div className="alert alert-error mt-6">
                            {error}
                        </div>

                    )}


                    {/* Search patient */}

                    <div className="bg-base-100 rounded-box shadow mt-8 p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Find Patient
                        </h2>


                        <div className="flex gap-3">

                            <input
                                type="text"
                                placeholder="Enter Patient ID"
                                className="input input-bordered w-full"
                                value={patientId}
                                onChange={(e) =>
                                    setPatientId(
                                        e.target.value
                                    )
                                }
                            />


                            <button
                                className="btn btn-primary"
                                onClick={searchRecords}
                            >
                                Search
                            </button>

                        </div>

                    </div>


                    {/* Previous records */}

                    {patientId && (

                        <div className="bg-base-100 rounded-box shadow mt-8 p-6">

                            <h2 className="text-xl font-bold mb-4">
                                Previous Records
                            </h2>


                            {loading ? (

                                <p>
                                    Loading records...
                                </p>

                            ) : records.length === 0 ? (

                                <p className="opacity-60">
                                    No previous medical records.
                                </p>

                            ) : (

                                <div className="space-y-4">

                                    {records.map((record) => (

                                        <div
                                            key={record._id}
                                            className="border rounded-lg p-4"
                                        >

                                            <p>
                                                <strong>
                                                    Date:
                                                </strong>{" "}
                                                {record.createdAt
                                                    ? new Date(
                                                        record.createdAt
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </p>


                                            <p>
                                                <strong>
                                                    Diagnosis:
                                                </strong>{" "}
                                                {record.diagnosis ||
                                                    "-"}
                                            </p>


                                            <p>
                                                <strong>
                                                    Symptoms:
                                                </strong>{" "}
                                                {record.symptoms ||
                                                    "-"}
                                            </p>


                                            <p>
                                                <strong>
                                                    Prescription:
                                                </strong>{" "}
                                                {record.prescription ||
                                                    "-"}
                                            </p>


                                            <p>
                                                <strong>
                                                    Notes:
                                                </strong>{" "}
                                                {record.notes ||
                                                    "-"}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    )}


                    {/* Create record */}

                    {patientId && (

                        <form
                            onSubmit={handleSubmit}
                            className="bg-base-100 rounded-box shadow mt-8 p-6"
                        >

                            <h2 className="text-xl font-bold mb-6">
                                Add Consultation Record
                            </h2>


                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    name="symptoms"
                                    placeholder="Symptoms"
                                    className="input input-bordered"
                                    value={form.symptoms}
                                    onChange={handleChange}
                                />


                                <input
                                    name="diagnosis"
                                    placeholder="Diagnosis"
                                    className="input input-bordered"
                                    value={form.diagnosis}
                                    onChange={handleChange}
                                />


                                <input
                                    name="prescription"
                                    placeholder="Prescription"
                                    className="input input-bordered"
                                    value={form.prescription}
                                    onChange={handleChange}
                                />


                                <input
                                    name="testResults"
                                    placeholder="Test Results"
                                    className="input input-bordered"
                                    value={form.testResults}
                                    onChange={handleChange}
                                />


                                <input
                                    type="date"
                                    name="followUpDate"
                                    className="input input-bordered"
                                    value={form.followUpDate}
                                    onChange={handleChange}
                                />

                            </div>


                            <textarea
                                name="notes"
                                placeholder="Doctor's notes"
                                className="textarea textarea-bordered w-full mt-4"
                                value={form.notes}
                                onChange={handleChange}
                            />


                            <button
                                type="submit"
                                className="btn btn-primary mt-6"
                            >
                                Save Medical Record
                            </button>

                        </form>

                    )}

                </main>

            </div>

        </div>
    );
};


export default DoctorMedicalRecords;