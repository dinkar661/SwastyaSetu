import {
    useEffect,
    useState
} from "react";

import {
    useSelector
} from "react-redux";

import referralService
    from "../../services/referralService";


const MyReferrals = () => {

    const user =
        useSelector(
            (state) => state.auth.user
        );


    const [referrals, setReferrals] =
        useState([]);


    useEffect(() => {

        const load =
            async () => {

                try {

                    const data =
                        await referralService
                            .getPatientReferrals(
                                user.patientId ||
                                user._id
                            );

                    setReferrals(data);

                } catch (error) {

                    console.error(error);

                }
            };


        if (user) {
            load();
        }

    }, [user]);


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Referrals
            </h1>


            {referrals.map(
                (referral) => (

                    <div
                        key={referral._id}
                        className="card bg-base-100 shadow p-5 mb-4"
                    >

                        <h2 className="font-bold">
                            {referral.reason}
                        </h2>

                        <p>
                            Status:
                            {" "}
                            {referral.status}
                        </p>

                    </div>

                )
            )}

        </div>
    );
};


export default MyReferrals;