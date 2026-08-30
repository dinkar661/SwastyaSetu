import {
    useState
} from "react";

import patientService
    from "../../services/patientService";


const RegisterPatient = () => {

    const [formData, setFormData] =
        useState({
            name: "",
            age: "",
            gender: "",
            phone: "",
            village: "",
            district: "",
            address: "",
            bloodGroup: "",
            allergies: "",
            chronicConditions: "",
            emergencyContact: ""
        });


    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            await patientService.createPatient(
                formData
            );

            setMessage(
                "Patient registered successfully"
            );

            setFormData({
                name: "",
                age: "",
                gender: "",
                phone: "",
                village: "",
                district: "",
                address: "",
                bloodGroup: "",
                allergies: "",
                chronicConditions: "",
                emergencyContact: ""
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to register patient"
            );
        }
    };


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Register Patient
            </h1>


            {message && (
                <div className="alert alert-success mb-4">
                    {message}
                </div>
            )}


            {error && (
                <div className="alert alert-error mb-4">
                    {error}
                </div>
            )}


            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
            >

                {Object.keys(formData).map(
                    (field) => (

                        <input
                            key={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                                field
                                    .replace(
                                        /([A-Z])/g,
                                        " $1"
                                    )
                            }
                            className="input input-bordered"
                            required={
                                [
                                    "name",
                                    "age",
                                    "gender",
                                    "phone"
                                ].includes(field)
                            }
                        />

                    )
                )}


                <button
                    className="btn btn-primary md:col-span-2"
                >
                    Register Patient
                </button>

            </form>

        </div>
    );
};


export default RegisterPatient;