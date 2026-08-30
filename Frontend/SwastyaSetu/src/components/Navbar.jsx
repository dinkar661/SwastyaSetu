import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    logoutUser
} from "../store/authSlice";


const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user =
        useSelector(
            (state) => state.auth.user
        );


    const handleLogout = async () => {

        await dispatch(
            logoutUser()
        );

        navigate("/login");
    };


    return (

        <div className="navbar bg-primary text-primary-content px-6">

            <div className="flex-1">

                <span className="text-xl font-bold">
                    SwasthyaSetu
                </span>

            </div>


            {user && (

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <p className="font-semibold">
                            {user.name}
                        </p>

                        <p className="text-xs">
                            {user.role}
                        </p>

                    </div>


                    <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline"
                    >
                        Logout
                    </button>

                </div>

            )}

        </div>
    );
};


export default Navbar;