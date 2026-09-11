import { useEffect } from "react";

import {
    useDispatch
} from "react-redux";

import {
    checkAuth
} from "./store/authSlice";

import AppRoutes from "./routes/AppRoutes";


function App() {

    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(checkAuth());

    }, [dispatch]);


    return (
        <AppRoutes />
    );
}


export default App;