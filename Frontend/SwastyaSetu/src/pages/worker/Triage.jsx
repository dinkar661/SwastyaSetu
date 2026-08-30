import {
    useState
} from "react";

import triageService
    from "../../services/triageService";


const Triage = () => {

    const [symptoms, setSymptoms] =
        useState("");

    const [age, setAge] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data =
                await triageService.assess({
                    age,
                    symptoms
                });

            setResult(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-6">
                AI-Assisted Triage
            </h1>


            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 shadow p-6"
            >

                <input
                    type="number"
                    placeholder="Patient Age"
                    className="input input-bordered mb-4"
                    value={age}
                    onChange={(e) =>
                        setAge(e.target.value)
                    }
                    required
                />


                <textarea
                    placeholder="Describe symptoms..."
                    className="textarea textarea-bordered h-40 mb-4"
                    value={symptoms}
                    onChange={(e) =>
                        setSymptoms(e.target.value)
                    }
                    required
                />


                <button
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Analyzing..."
                        : "Assess Patient"}
                </button>

            </form>


            {result && (

                <div className="card bg-base-100 shadow mt-6 p-6">

                    <h2 className="text-xl font-bold">
                        Triage Result
                    </h2>

                    <p className="mt-3">
                        Priority:
                        {" "}
                        <strong>
                            {result.priority}
                        </strong>
                    </p>

                    <p className="mt-3">
                        Recommendation:
                        {" "}
                        {result.recommendation}
                    </p>

                </div>

            )}

        </div>
    );
};


export default Triage;