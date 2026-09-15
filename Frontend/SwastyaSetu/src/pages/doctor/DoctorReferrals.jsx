import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import {
    createReferral
} from "../../services/referralService";


const DoctorReferrals = () => {

    const [form, setForm] = useState({

        patientId: "",
        fromFacility: "",
        toFacility: "",
        reason: "",
        priority: "ROUTINE"

    });


    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setMessage("");

            setError("");


            await createReferral(form);


            setMessage(
                "Referral created successfully."
            );


            setForm({

                patientId: "",
                fromFacility: "",
                toFacility: "",
                reason: "",
                priority: "ROUTINE"

            });

        } catch (error) {

            console.log(
                "Create referral error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create referral."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div>

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold">
                        Referrals
                    </h1>

                    <p className="mt-2 opacity-70">
                        Refer patients to higher healthcare facilities
                    </p>


                    {message && (

                        <div className="alert alert-success mt-6">
                            {message}
                        </div>

                    )}


                    {error && (

                        <div className="alert alert-error mt-6">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="bg-base-100 rounded-box shadow mt-8 p-6"
                    >

                        <h2 className="text-xl font-bold mb-6">
                            Create Referral
                        </h2>


                        <div className="grid md:grid-cols-2 gap-4">


                            <input
                                name="patientId"
                                placeholder="Patient ID"
                                className="input input-bordered"
                                value={form.patientId}
                                onChange={handleChange}
                                required
                            />


                            <input
                                name="fromFacility"
                                placeholder="From Facility"
                                className="input input-bordered"
                                value={form.fromFacility}
                                onChange={handleChange}
                                required
                            />


                            <input
                                name="toFacility"
                                placeholder="To Facility"
                                className="input input-bordered"
                                value={form.toFacility}
                                onChange={handleChange}
                                required
                            />


                            <select
                                name="priority"
                                className="select select-bordered"
                                value={form.priority}
                                onChange={handleChange}
                            >

                                <option value="ROUTINE">
                                    Routine
                                </option>

                                <option value="URGENT">
                                    Urgent
                                </option>

                                <option value="EMERGENCY">
                                    Emergency
                                </option>

                            </select>

                        </div>


                        <textarea
                            name="reason"
                            placeholder="Reason for referral"
                            className="textarea textarea-bordered w-full mt-4"
                            value={form.reason}
                            onChange={handleChange}
                            required
                        />


                        <button
                            type="submit"
                            className="btn btn-primary mt-6"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create Referral"}

                        </button>

                    </form>

                </main>

            </div>

        </div>
    );
};


export default DoctorReferrals;