import { useEffect, useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
    login,
    clearError,
} from "../store/authSlice";


const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        user,
        isAuthenticated,
        loading,
        error,
    } = useSelector((state) => state.auth);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        dispatch(login(formData));

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <div className="card w-96 bg-base-100 shadow-xl">

                <div className="card-body">

                    <h2 className="text-3xl font-bold text-center">
                        SwasthyaSetu
                    </h2>

                    <p className="text-center opacity-60">
                        Login to your account
                    </p>


                    {error && (
                        <div className="alert alert-error mt-4">
                            {error}
                        </div>
                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 mt-4"
                    >

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


                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"
                            }

                        </button>

                    </form>


                    <div className="text-center mt-4">

                        <p>
                            Don't have an account?
                        </p>

                        <button
                            className="link link-primary"
                            onClick={() => navigate("/signup")}
                        >
                            Create account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default Login;