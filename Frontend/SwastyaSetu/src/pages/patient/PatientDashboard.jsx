import StatCard from "../../components/statCard";

import {
    FileText,
    Calendar,
    GitBranch
} from "lucide-react";


const PatientDashboard = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Health Dashboard
            </h1>


            <div className="grid md:grid-cols-3 gap-4">

                <StatCard
                    title="Medical Records"
                    value="8"
                    icon={<FileText />}
                />

                <StatCard
                    title="Upcoming Appointments"
                    value="2"
                    icon={<Calendar />}
                />

                <StatCard
                    title="Active Referrals"
                    value="1"
                    icon={<GitBranch />}
                />

            </div>

        </div>
    );
};


export default PatientDashboard;