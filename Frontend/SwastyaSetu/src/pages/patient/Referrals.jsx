import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";

import {
    getMyReferrals
} from "../../services/referralService";


const Referrals = () => {

    const [referrals, setReferrals] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadReferrals = async () => {

            try {

                const data =
                    await getMyReferrals();


                const referralList =
                    data.referrals ||
                    data ||
                    [];


                setReferrals(
                    Array.isArray(referralList)
                        ? referralList
                        : []
                );

            }
            catch (error) {

                console.log(
                    "Referral error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load referrals."
                );

            }
            finally {

                setLoading(false);

            }

        };


        loadReferrals();

    }, []);


    return (

        <div>

            <Navbar />


            <div className="flex">

                <Sidebar />


                <main className="flex-1 p-6 bg-base-200 min-h-[calc(100vh-64px)]">

                    <h1 className="text-3xl font-bold mb-6">
                        My Referrals
                    </h1>


                    {error && (

                        <div className="alert alert-error mb-6">
                            {error}
                        </div>

                    )}


                    {loading ? (

                        <div className="flex justify-center">

                            <span className="loading loading-spinner loading-lg"></span>

                        </div>

                    ) : referrals.length === 0 ? (

                        <div className="card bg-base-100 shadow">

                            <div className="card-body text-center">

                                <h2 className="text-xl font-bold">
                                    No Referrals
                                </h2>

                                <p className="opacity-60">
                                    You don't have any referrals currently.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {referrals.map(
                                (referral) => (

                                    <div
                                        key={referral._id}
                                        className="card bg-base-100 shadow"
                                    >

                                        <div className="card-body">


                                            <div className="flex justify-between items-center">

                                                <h2 className="card-title">
                                                    Healthcare Referral
                                                </h2>


                                                <span
                                                    className={
                                                        referral.priority ===
                                                        "EMERGENCY"
                                                            ? "badge badge-error"
                                                            : referral.priority ===
                                                              "URGENT"
                                                            ? "badge badge-warning"
                                                            : "badge badge-info"
                                                    }
                                                >

                                                    {referral.priority ||
                                                        "ROUTINE"}

                                                </span>

                                            </div>


                                            <div className="divider"></div>


                                            <div className="grid md:grid-cols-2 gap-4">


                                                <div>

                                                    <p className="font-bold">
                                                        Reason
                                                    </p>

                                                    <p>
                                                        {referral.reason}
                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="font-bold">
                                                        Status
                                                    </p>

                                                    <span className="badge badge-primary">

                                                        {referral.status}

                                                    </span>

                                                </div>


                                                <div>

                                                    <p className="font-bold">
                                                        Created On
                                                    </p>

                                                    <p>

                                                        {referral.createdAt
                                                            ? new Date(
                                                                referral.createdAt
                                                            ).toLocaleDateString()
                                                            : "-"}

                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="font-bold">
                                                        Referral ID
                                                    </p>

                                                    <p className="text-sm">
                                                        {referral._id}
                                                    </p>

                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};


export default Referrals;