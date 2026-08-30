const ReferralTimeline = ({
    referrals
}) => {

    return (

        <ul className="timeline timeline-vertical">

            {referrals.map(
                (referral) => (

                    <li key={referral._id}>

                        <div className="timeline-start">
                            {new Date(
                                referral.createdAt
                            ).toLocaleDateString()}
                        </div>

                        <div className="timeline-middle">
                            ●
                        </div>

                        <div className="timeline-end timeline-box">

                            <p className="font-bold">
                                {referral.status}
                            </p>

                            <p>
                                {referral.reason}
                            </p>

                        </div>

                    </li>

                )
            )}

        </ul>
    );
};


export default ReferralTimeline;