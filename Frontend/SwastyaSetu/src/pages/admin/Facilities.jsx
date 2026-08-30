const Facilities = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Healthcare Facilities
            </h1>

            <div className="overflow-x-auto">

                <table className="table">

                    <thead>

                        <tr>
                            <th>Facility</th>
                            <th>District</th>
                            <th>Doctors</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>PHC A</td>
                            <td>Patna</td>
                            <td>5</td>
                            <td>
                                <span className="badge badge-success">
                                    Active
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default Facilities;