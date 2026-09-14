import { useEffect, useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
    register,
    clearError,
} from "../store/authSlice";


const Signup = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        user,
        isAuthenticated,
        loading,
        error,
    } = useSelector((state) => state.auth);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "PATIENT",
    });


    useEffect(() => {

        if (isAuthenticated && user) {

            if (user.role === "PATIENT") {
                navigate("/patient/dashboard");
            }

            else if (user.role === "HEALTH_WORKER") {
                navigate("/healthworker/dashboard");
            }

            else if (user.role === "DOCTOR") {
                navigate("/doctor/dashboard");
            }

            else if (user.role === "ADMIN") {
                navigate("/admin/dashboard");
            }

        }

    }, [isAuthenticated, user, navigate]);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(clearError());

        dispatch(register(formData));

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <div className="card w-96 bg-base-100 shadow-xl">

                <div className="card-body">

                    <h2 className="text-3xl font-bold text-center">
                        Create Account
                    </h2>


                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="input input-bordered w-full"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />


                        <select
                            name="role"
                            className="select select-bordered w-full"
                            value={formData.role}
                            onChange={handleChange}
                        >

                            <option value="PATIENT">
                                Patient
                            </option>

                            <option value="HEALTH_WORKER">
                                Health Worker
                            </option>

                            <option value="DOCTOR">
                                Doctor
                            </option>

                        </select>


                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create Account"
                            }

                        </button>

                    </form>


                    <div className="text-center mt-4">

                        Already have an account?

                        <button
                            className="link link-primary ml-2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default Signup;