import {
    Users,
    UserPlus,
    Activity,
    FileText
} from "lucide-react";

import StatCard from "../../components/statCard";


const WorkerDashboard = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Health Worker Dashboard
            </h1>


            <div className="grid md:grid-cols-4 gap-4">

                <StatCard
                    title="Total Patients"
                    value="124"
                    icon={<Users />}
                />

                <StatCard
                    title="Today's Registrations"
                    value="18"
                    icon={<UserPlus />}
                />

                <StatCard
                    title="Pending Triage"
                    value="7"
                    icon={<Activity />}
                />

                <StatCard
                    title="Referrals"
                    value="12"
                    icon={<FileText />}
                />

            </div>


            <div className="mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Quick Actions
                </h2>

                <div className="flex gap-3">

                    <a
                        href="/worker/register-patient"
                        className="btn btn-primary"
                    >
                        Register Patient
                    </a>

                    <a
                        href="/worker/triage"
                        className="btn btn-secondary"
                    >
                        AI Triage
                    </a>

                </div>

            </div>

        </div>
    );
};


export default WorkerDashboard;