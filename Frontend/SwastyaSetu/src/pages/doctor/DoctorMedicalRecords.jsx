import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    getMedicalRecords,
    createMedicalRecord
} from "../../services/medicalRecordService";


const DoctorMedicalRecords = () => {

    // ========================================
    // PATIENT
    // ========================================

    const [patientId, setPatientId] = useState("");

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ========================================
    // MEDICAL RECORD FORM
    // ========================================

    const [form, setForm] = useState({

        symptoms: "",

        diagnosis: "",

        testResults: "",

        followUpDate: "",

        notes: "",

        visitType: "IN_PERSON"

    });


    // ========================================
    // PRESCRIPTION
    // ========================================

    const [prescription, setPrescription] = useState([

        {
            medicine: "",
            dosage: "",
            duration: ""
        }

    ]);


    // ========================================
    // SEARCH PATIENT RECORDS
    // ========================================

    const searchRecords = async () => {

        if (!patientId.trim()) {

            setError("Please enter patient ID.");

            return;
        }


        try {

            setError("");

            setLoading(true);


            const data =
                await getMedicalRecords(
                    patientId.trim()
                );


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


    // ========================================
    // HANDLE NORMAL INPUT
    // ========================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };


    // ========================================
    // HANDLE PRESCRIPTION
    // ========================================

    const handlePrescriptionChange = (
        index,
        field,
        value
    ) => {

        const updatedPrescription =
            [...prescription];


        updatedPrescription[index][field] =
            value;


        setPrescription(
            updatedPrescription
        );
    };


    // ========================================
    // ADD MEDICINE
    // ========================================

    const addMedicine = () => {

        setPrescription([

            ...prescription,

            {
                medicine: "",
                dosage: "",
                duration: ""
            }

        ]);
    };


    // ========================================
    // REMOVE MEDICINE
    // ========================================

    const removeMedicine = (index) => {

        const updatedPrescription =
            prescription.filter(
                (_, i) => i !== index
            );


        setPrescription(
            updatedPrescription
        );
    };


    // ========================================
    // SUBMIT
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!patientId.trim()) {

            setError(
                "Please search for a patient first."
            );

            return;
        }


        try {

            setError("");


            // Remove empty prescription rows

            const validPrescription =
                prescription.filter(
                    (item) =>
                        item.medicine.trim() !== ""
                );


            const data =
                await createMedicalRecord({

                    patientId:
                        patientId.trim(),

                    symptoms:
                        form.symptoms
                            .split(",")
                            .map(
                                (item) =>
                                    item.trim()
                            )
                            .filter(
                                (item) =>
                                    item !== ""
                            ),

                    diagnosis:
                        form.diagnosis,

                    testResults:
                        form.testResults,

                    prescription:
                        validPrescription,

                    followUpDate:
                        form.followUpDate ||
                        null,

                    notes:
                        form.notes,

                    visitType:
                        form.visitType

                });


            alert(
                "Medical record created successfully"
            );


            // Add new record at top

            setRecords([
                data,
                ...records
            ]);


            // Reset form

            setForm({

                symptoms: "",

                diagnosis: "",

                testResults: "",

                followUpDate: "",

                notes: "",

                visitType: "IN_PERSON"

            });


            setPrescription([

                {
                    medicine: "",
                    dosage: "",
                    duration: ""
                }

            ]);


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


                <main
                    className="
                        flex-1
                        p-6
                        bg-base-200
                        min-h-[calc(100vh-64px)]
                    "
                >

                    {/* ================================= */}
                    {/* PAGE HEADER */}
                    {/* ================================= */}

                    <h1 className="text-3xl font-bold">

                        Medical Records

                    </h1>


                    <p className="mt-2 opacity-70">

                        View patient history and create
                        consultation records

                    </p>


                    {/* ================================= */}
                    {/* ERROR */}
                    {/* ================================= */}

                    {error && (

                        <div className="alert alert-error mt-6">

                            {error}

                        </div>

                    )}


                    {/* ================================= */}
                    {/* SEARCH PATIENT */}
                    {/* ================================= */}

                    <div
                        className="
                            bg-base-100
                            rounded-box
                            shadow
                            mt-8
                            p-6
                        "
                    >

                        <h2 className="text-xl font-bold mb-4">

                            Find Patient

                        </h2>


                        <div className="
                            flex
                            flex-col
                            md:flex-row
                            gap-3
                        ">

                            <input
                                type="text"
                                placeholder="Enter Patient ID"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={patientId}
                                onChange={(e) =>
                                    setPatientId(
                                        e.target.value
                                    )
                                }
                            />


                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={searchRecords}
                                disabled={loading}
                            >

                                {loading
                                    ? "Searching..."
                                    : "Search"}

                            </button>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* PREVIOUS RECORDS */}
                    {/* ================================= */}

                    {patientId && (

                        <div
                            className="
                                bg-base-100
                                rounded-box
                                shadow
                                mt-8
                                p-6
                            "
                        >

                            <h2 className="
                                text-xl
                                font-bold
                                mb-6
                            ">

                                Previous Medical Records

                            </h2>


                            {loading ? (

                                <p>
                                    Loading records...
                                </p>

                            ) : records.length === 0 ? (

                                <p className="opacity-60">

                                    No previous medical
                                    records.

                                </p>

                            ) : (

                                <div className="space-y-6">

                                    {records.map(
                                        (record) => (

                                            <div
                                                key={
                                                    record._id
                                                }
                                                className="
                                                    border
                                                    rounded-lg
                                                    p-5
                                                "
                                            >

                                                {/* DATE */}

                                                <div className="
                                                    flex
                                                    justify-between
                                                    items-center
                                                    mb-4
                                                ">

                                                    <h3 className="
                                                        font-bold
                                                        text-lg
                                                    ">

                                                        {record.createdAt
                                                            ? new Date(
                                                                record.createdAt
                                                            ).toLocaleDateString()
                                                            : "-"}

                                                    </h3>


                                                    <span className="
                                                        badge
                                                        badge-primary
                                                    ">

                                                        {record.visitType ||
                                                            "IN_PERSON"}

                                                    </span>

                                                </div>


                                                {/* SYMPTOMS */}

                                                <div className="mb-3">

                                                    <p className="font-semibold">

                                                        Symptoms

                                                    </p>


                                                    <p className="opacity-70">

                                                        {Array.isArray(
                                                            record.symptoms
                                                        )
                                                            ? record.symptoms.join(
                                                                ", "
                                                            )
                                                            : record.symptoms ||
                                                            "-"}

                                                    </p>

                                                </div>


                                                {/* DIAGNOSIS */}

                                                <div className="mb-3">

                                                    <p className="font-semibold">

                                                        Diagnosis

                                                    </p>


                                                    <p className="opacity-70">

                                                        {record.diagnosis ||
                                                            "-"}

                                                    </p>

                                                </div>


                                                {/* TEST RESULTS */}

                                                <div className="mb-3">

                                                    <p className="font-semibold">

                                                        Test Results

                                                    </p>


                                                    <p className="opacity-70">

                                                        {record.testResults ||
                                                            "-"}

                                                    </p>

                                                </div>


                                                {/* PRESCRIPTION */}

                                                <div className="mb-3">

                                                    <p className="
                                                        font-semibold
                                                        mb-2
                                                    ">

                                                        Prescription

                                                    </p>


                                                    {!record.prescription ||
                                                    record.prescription.length === 0 ? (

                                                        <p className="opacity-60">

                                                            No prescription

                                                        </p>

                                                    ) : (

                                                        <div className="
                                                            overflow-x-auto
                                                        ">

                                                            <table className="
                                                                table
                                                                table-sm
                                                            ">

                                                                <thead>

                                                                    <tr>

                                                                        <th>
                                                                            Medicine
                                                                        </th>

                                                                        <th>
                                                                            Dosage
                                                                        </th>

                                                                        <th>
                                                                            Duration
                                                                        </th>

                                                                    </tr>

                                                                </thead>


                                                                <tbody>

                                                                    {record.prescription.map(
                                                                        (
                                                                            medicine,
                                                                            index
                                                                        ) => (

                                                                            <tr
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >

                                                                                <td>

                                                                                    {
                                                                                        medicine.medicine
                                                                                    }

                                                                                </td>

                                                                                <td>

                                                                                    {
                                                                                        medicine.dosage ||
                                                                                        "-"
                                                                                    }

                                                                                </td>

                                                                                <td>

                                                                                    {
                                                                                        medicine.duration ||
                                                                                        "-"
                                                                                    }

                                                                                </td>

                                                                            </tr>

                                                                        )
                                                                    )}

                                                                </tbody>

                                                            </table>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* FOLLOW UP */}

                                                <div className="mb-3">

                                                    <p className="font-semibold">

                                                        Follow-up Date

                                                    </p>


                                                    <p className="opacity-70">

                                                        {record.followUpDate
                                                            ? new Date(
                                                                record.followUpDate
                                                            ).toLocaleDateString()
                                                            : "No follow-up"}

                                                    </p>

                                                </div>


                                                {/* NOTES */}

                                                <div>

                                                    <p className="font-semibold">

                                                        Notes

                                                    </p>


                                                    <p className="opacity-70">

                                                        {record.notes ||
                                                            "-"}

                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    )}


                    {/* ================================= */}
                    {/* CREATE MEDICAL RECORD */}
                    {/* ================================= */}

                    {patientId && (

                        <form
                            onSubmit={handleSubmit}
                            className="
                                bg-base-100
                                rounded-box
                                shadow
                                mt-8
                                p-6
                            "
                        >

                            <h2 className="
                                text-xl
                                font-bold
                                mb-6
                            ">

                                Add Consultation Record

                            </h2>


                            {/* VISIT TYPE */}

                            <div className="form-control mb-5">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Visit Type

                                    </span>

                                </label>


                                <select
                                    name="visitType"
                                    className="
                                        select
                                        select-bordered
                                    "
                                    value={
                                        form.visitType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="IN_PERSON">

                                        In Person

                                    </option>


                                    <option value="TELECONSULTATION">

                                        Teleconsultation

                                    </option>

                                </select>

                            </div>


                            {/* SYMPTOMS */}

                            <div className="form-control mb-5">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Symptoms

                                    </span>

                                </label>


                                <input
                                    name="symptoms"
                                    placeholder="
                                        Example:
                                        Fever, Headache, Weakness
                                    "
                                    className="
                                        input
                                        input-bordered
                                    "
                                    value={
                                        form.symptoms
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <label className="label">

                                    <span className="label-text-alt opacity-60">

                                        Separate multiple
                                        symptoms with commas

                                    </span>

                                </label>

                            </div>


                            {/* DIAGNOSIS */}

                            <div className="form-control mb-5">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Diagnosis

                                    </span>

                                </label>


                                <textarea
                                    name="diagnosis"
                                    placeholder="Enter diagnosis"
                                    className="
                                        textarea
                                        textarea-bordered
                                        w-full
                                    "
                                    value={
                                        form.diagnosis
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* TEST RESULTS */}

                            <div className="form-control mb-5">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Test Results

                                    </span>

                                </label>


                                <textarea
                                    name="testResults"
                                    placeholder="
                                        Enter laboratory /
                                        diagnostic test results
                                    "
                                    className="
                                        textarea
                                        textarea-bordered
                                        w-full
                                    "
                                    value={
                                        form.testResults
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* ================================= */}
                            {/* PRESCRIPTION */}
                            {/* ================================= */}

                            <div className="
                                border
                                rounded-lg
                                p-4
                                mb-5
                            ">

                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                    mb-4
                                ">

                                    <h3 className="
                                        font-semibold
                                        text-lg
                                    ">

                                        Prescription

                                    </h3>


                                    <button
                                        type="button"
                                        className="
                                            btn
                                            btn-sm
                                            btn-outline
                                        "
                                        onClick={
                                            addMedicine
                                        }
                                    >

                                        + Add Medicine

                                    </button>

                                </div>


                                <div className="space-y-4">

                                    {prescription.map(
                                        (
                                            medicine,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="
                                                    grid
                                                    md:grid-cols-4
                                                    gap-3
                                                    items-end
                                                "
                                            >

                                                {/* MEDICINE */}

                                                <div className="form-control">

                                                    <label className="label">

                                                        <span className="
                                                            label-text
                                                        ">

                                                            Medicine

                                                        </span>

                                                    </label>


                                                    <input
                                                        type="text"
                                                        placeholder="Paracetamol"
                                                        className="
                                                            input
                                                            input-bordered
                                                        "
                                                        value={
                                                            medicine.medicine
                                                        }
                                                        onChange={(e) =>
                                                            handlePrescriptionChange(
                                                                index,
                                                                "medicine",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                {/* DOSAGE */}

                                                <div className="form-control">

                                                    <label className="label">

                                                        <span className="
                                                            label-text
                                                        ">

                                                            Dosage

                                                        </span>

                                                    </label>


                                                    <input
                                                        type="text"
                                                        placeholder="500mg"
                                                        className="
                                                            input
                                                            input-bordered
                                                        "
                                                        value={
                                                            medicine.dosage
                                                        }
                                                        onChange={(e) =>
                                                            handlePrescriptionChange(
                                                                index,
                                                                "dosage",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                {/* DURATION */}

                                                <div className="form-control">

                                                    <label className="label">

                                                        <span className="
                                                            label-text
                                                        ">

                                                            Duration

                                                        </span>

                                                    </label>


                                                    <input
                                                        type="text"
                                                        placeholder="5 days"
                                                        className="
                                                            input
                                                            input-bordered
                                                        "
                                                        value={
                                                            medicine.duration
                                                        }
                                                        onChange={(e) =>
                                                            handlePrescriptionChange(
                                                                index,
                                                                "duration",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                {/* REMOVE */}

                                                <button
                                                    type="button"
                                                    className="
                                                        btn
                                                        btn-error
                                                        btn-outline
                                                    "
                                                    disabled={
                                                        prescription.length === 1
                                                    }
                                                    onClick={() =>
                                                        removeMedicine(
                                                            index
                                                        )
                                                    }
                                                >

                                                    Remove

                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>


                            {/* FOLLOW UP */}

                            <div className="form-control mb-5">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Follow-up Date

                                    </span>

                                </label>


                                <input
                                    type="date"
                                    name="followUpDate"
                                    className="
                                        input
                                        input-bordered
                                    "
                                    value={
                                        form.followUpDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* NOTES */}

                            <div className="form-control mb-6">

                                <label className="label">

                                    <span className="label-text font-semibold">

                                        Doctor's Notes

                                    </span>

                                </label>


                                <textarea
                                    name="notes"
                                    placeholder="
                                        Enter consultation notes,
                                        instructions, observations...
                                    "
                                    className="
                                        textarea
                                        textarea-bordered
                                        w-full
                                        min-h-32
                                    "
                                    value={
                                        form.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="
                                    btn
                                    btn-primary
                                "
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