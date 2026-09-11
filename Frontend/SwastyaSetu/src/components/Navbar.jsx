import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/authSlice";


const Navbar = () => {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(
        (state) => state.auth
    );


    const handleLogout = () => {

        dispatch(logout());

    };


    return (

        <div className="navbar bg-base-100 shadow-md px-6">

            <div className="flex-1">

                <span className="text-xl font-bold text-primary">
                    SwasthyaSetu
                </span>

            </div>


            <div className="flex items-center gap-4">

                {user && (
                    <>
                        <div className="text-right">

                            <p className="font-semibold">
                                {user.name}
                            </p>

                            <p className="text-sm opacity-60">
                                {user.role}
                            </p>

                        </div>


                        <button
                            onClick={handleLogout}
                            className="btn btn-error btn-sm"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging out..."
                                : "Logout"
                            }

                        </button>
                    </>
                )}

            </div>

        </div>
    );
};


export default Navbar;