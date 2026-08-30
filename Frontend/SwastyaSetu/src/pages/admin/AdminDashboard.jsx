import {
    Building2,
    Users,
    Activity,
    Ambulance
} from "lucide-react";

import StatCard from "../../components/statCard";


const AdminDashboard = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Government Dashboard
            </h1>


            <div className="grid md:grid-cols-4 gap-4">

                <StatCard
                    title="Facilities"
                    value="42"
                    icon={<Building2 />}
                />

                <StatCard
                    title="Patients Served"
                    value="12,450"
                    icon={<Users />}
                />

                <StatCard
                    title="Consultations"
                    value="8,932"
                    icon={<Activity />}
                />

                <StatCard
                    title="Active Referrals"
                    value="183"
                    icon={<Ambulance />}
                />

            </div>


            <div className="mt-8 card bg-base-100 shadow p-6">

                <h2 className="text-xl font-bold mb-4">
                    System Overview
                </h2>

                <p>
                    Monitor healthcare access,
                    referrals, consultations,
                    facilities and patient
                    outcomes across the network.
                </p>

            </div>

        </div>
    );
};


export default AdminDashboard;