import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getMyAppointments,
} from "../../services/appointmentService";

import {
    getMyMedicalRecords,
} from "../../services/medicalRecordService";

import {
    getMyReferrals,
} from "../../services/referralService";


const PatientDashboard = () => {

    const { user } = useSelector(
        (state) => state.auth
    );


    const [appointments, setAppointments] = useState([]);

    const [records, setRecords] = useState([]);

    const [referrals, setReferrals] = useState([]);


    useEffect(() => {

        const loadData = async () => {

            try {

                const appointmentData =
                    await getMyAppointments();

                setAppointments(
                    appointmentData.appointments ||
                    appointmentData ||
                    []
                );


                if (user?.patientId) {

                    const recordData =
                        await getMyMedicalRecords(
                            user.patientId
                        );

                    setRecords(
                        recordData.records ||
                        recordData ||
                        []
                    );

                }


                const referralData =
                    await getMyReferrals();

                setReferrals(
                    referralData.referrals ||
                    referralData ||
                    []
                );

            } catch (error) {

                console.log(
                    "Dashboard error:",
                    error
                );

            }

        };


        loadData();

    }, [user]);


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold mb-6">
                        Patient Dashboard
                    </h1>


                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Appointments
                            </div>

                            <div className="stat-value">
                                {appointments.length}
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Medical Records
                            </div>

                            <div className="stat-value">
                                {records.length}
                            </div>

                        </div>


                        <div className="stat bg-base-100 shadow rounded-box">

                            <div className="stat-title">
                                Referrals
                            </div>

                            <div className="stat-value">
                                {referrals.length}
                            </div>

                        </div>

                    </div>


                    <div className="mt-8 bg-base-100 p-6 rounded-box shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Welcome, {user?.name}
                        </h2>

                        <p>
                            Your healthcare information,
                            appointments and referrals
                            can be managed from this dashboard.
                        </p>

                    </div>

                </main>

            </div>

        </div>
    );
};


export default PatientDashboard;