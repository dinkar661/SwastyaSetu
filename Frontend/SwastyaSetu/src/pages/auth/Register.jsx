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
            phone: "",
            role: "PATIENT",
            language: "en",
            facilityId: ""
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


        // Create data according to User schema
        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
            language: formData.language
        };


        // facilityId is optional
        if (formData.facilityId.trim() !== "") {

            data.facilityId =
                formData.facilityId;
        }


        const result =
            await dispatch(
                registerUser(data)
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

        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">

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


                {/* Name */}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered w-full mb-4"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                {/* Email */}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-4"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />


                {/* Phone */}

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="input input-bordered w-full mb-4"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />


                {/* Password */}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-4"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                />


                {/* Role */}

                <select
                    name="role"
                    className="select select-bordered w-full mb-4"
                    value={formData.role}
                    onChange={handleChange}
                    required
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

                    <option value="ADMIN">
                        Admin
                    </option>

                </select>


                {/* Language */}

                <select
                    name="language"
                    className="select select-bordered w-full mb-4"
                    value={formData.language}
                    onChange={handleChange}
                    required
                >

                    <option value="en">
                        English
                    </option>

                    <option value="hi">
                        Hindi
                    </option>

                    <option value="mr">
                        Marathi
                    </option>

                </select>


                {/* Facility ID */}

                <input
                    type="text"
                    name="facilityId"
                    placeholder="Facility ID (Optional)"
                    className="input input-bordered w-full mb-6"
                    value={formData.facilityId}
                    onChange={handleChange}
                />


                {/* Submit */}

                <button
                    type="submit"
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