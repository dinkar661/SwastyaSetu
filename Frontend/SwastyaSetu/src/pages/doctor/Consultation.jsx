import {
    useState
} from "react";

import medicalRecordService
    from "../../services/medicalRecordService";


const Consultation = () => {

    const [formData, setFormData] =
        useState({
            patientId: "",
            diagnosis: "",
            symptoms: "",
            prescription: "",
            notes: "",
            testResults: "",
            followUpDate: ""
        });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await medicalRecordService
                .createRecord(formData);

            alert(
                "Medical record saved"
            );

            setFormData({
                patientId: "",
                diagnosis: "",
                symptoms: "",
                prescription: "",
                notes: "",
                testResults: "",
                followUpDate: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to save record"
            );
        }
    };


    return (

        <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-6">
                Consultation
            </h1>


            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    name="patientId"
                    placeholder="Patient ID"
                    className="input input-bordered w-full"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                />


                <input
                    name="diagnosis"
                    placeholder="Diagnosis"
                    className="input input-bordered w-full"
                    value={formData.diagnosis}
                    onChange={handleChange}
                />


                <textarea
                    name="symptoms"
                    placeholder="Symptoms"
                    className="textarea textarea-bordered w-full"
                    value={formData.symptoms}
                    onChange={handleChange}
                />


                <textarea
                    name="prescription"
                    placeholder="Prescription"
                    className="textarea textarea-bordered w-full"
                    value={formData.prescription}
                    onChange={handleChange}
                />


                <textarea
                    name="testResults"
                    placeholder="Test Results"
                    className="textarea textarea-bordered w-full"
                    value={formData.testResults}
                    onChange={handleChange}
                />


                <textarea
                    name="notes"
                    placeholder="Doctor Notes"
                    className="textarea textarea-bordered w-full"
                    value={formData.notes}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    name="followUpDate"
                    className="input input-bordered w-full"
                    value={formData.followUpDate}
                    onChange={handleChange}
                />


                <button className="btn btn-primary w-full">
                    Save Medical Record
                </button>

            </form>

        </div>
    );
};


export default Consultation;