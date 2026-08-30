const StatCard = ({
    title,
    value,
    description,
    icon
}) => {

    return (

        <div className="card bg-base-100 shadow-md">

            <div className="card-body">

                <div className="flex justify-between">

                    <div>

                        <p className="text-sm text-gray-500">
                            {title}
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {value}
                        </h2>

                        {description && (

                            <p className="text-sm mt-2 text-gray-500">
                                {description}
                            </p>

                        )}

                    </div>

                    {icon && (

                        <div className="text-primary text-3xl">
                            {icon}
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};


export default StatCard;