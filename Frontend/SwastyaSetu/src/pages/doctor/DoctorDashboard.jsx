import {
    Users,
    Clock,
    Calendar,
    FileText
} from "lucide-react";

import StatCard from "../../components/statCard";


const DoctorDashboard = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Doctor Dashboard
            </h1>


            <div className="grid md:grid-cols-4 gap-4">

                <StatCard
                    title="Today's Patients"
                    value="24"
                    icon={<Users />}
                />

                <StatCard
                    title="Waiting"
                    value="8"
                    icon={<Clock />}
                />

                <StatCard
                    title="Appointments"
                    value="16"
                    icon={<Calendar />}
                />

                <StatCard
                    title="Referrals"
                    value="5"
                    icon={<FileText />}
                />

            </div>

        </div>
    );
};


export default DoctorDashboard;