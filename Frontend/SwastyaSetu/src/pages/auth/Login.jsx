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
    loginUser
} from "../../store/authSlice";


const Login = () => {

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
            email: "",
            password: ""
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
                loginUser(formData)
            );


        if (
            loginUser.fulfilled.match(
                result
            )
        ) {

            const role =
                result.payload.user.role;


            if (role === "PATIENT") {
                navigate(
                    "/patient/dashboard"
                );
            }

            else if (
                role === "HEALTH_WORKER"
            ) {
                navigate(
                    "/worker/dashboard"
                );
            }

            else if (
                role === "DOCTOR"
            ) {
                navigate(
                    "/doctor/dashboard"
                );
            }

            else if (role === "ADMIN") {
                navigate(
                    "/admin/dashboard"
                );
            }
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-md shadow-xl p-8"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    SwasthyaSetu
                </h1>

                <p className="text-center mb-6">
                    Login to your account
                </p>


                {error && (

                    <div className="alert alert-error mb-4">
                        {error}
                    </div>

                )}


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
                    className="input input-bordered w-full mb-6"
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
                        : "Login"}
                </button>


                <p className="text-center mt-5">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="link link-primary ml-1"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
};


export default Login;