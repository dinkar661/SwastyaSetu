import {
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    registerUser
} from "../../store/authSlice";


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error
    } = useSelector(
        (state) => state.auth
    );


    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            role: "PATIENT"
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

        const result =
            await dispatch(
                registerUser(formData)
            );


        if (
            registerUser.fulfilled.match(
                result
            )
        ) {

            navigate("/");
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-md shadow-xl p-8"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h1>


                {error && (

                    <div className="alert alert-error mb-4">
                        {error}
                    </div>

                )}


                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered w-full mb-4"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-4"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-4"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />


                <select
                    name="role"
                    className="select select-bordered w-full mb-6"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option value="PATIENT">
                        Patient
                    </option>

                    <option value="HEALTH_WORKER">
                        Health Worker
                    </option>

                </select>


                <button
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Register"}
                </button>


                <p className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/login"
                        className="link link-primary ml-1"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
};


export default Register;