const Analytics = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Analytics
            </h1>


            <div className="grid md:grid-cols-2 gap-5">

                <div className="card bg-base-100 shadow p-6">

                    <h2 className="font-bold">
                        Average Waiting Time
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        24 min
                    </p>

                </div>


                <div className="card bg-base-100 shadow p-6">

                    <h2 className="font-bold">
                        Referral Completion
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        78%
                    </p>

                </div>

            </div>

        </div>
    );
};


export default Analytics;