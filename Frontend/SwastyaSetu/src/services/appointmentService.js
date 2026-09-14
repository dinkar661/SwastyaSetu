import api from "./api";


// Patient creates appointment
export const createAppointment = async (data) => {

    const response = await api.post(
        "/appointments/",
        data
    );

    return response.data;
};


// Patient gets own appointments
export const getMyAppointments = async () => {

    const response = await api.get(
        "/appointments/my"
    );

    return response.data;
};


// Doctor gets queue
export const getDoctorQueue = async () => {

    const response = await api.get(
        "/appointments/doctor"
    );

    return response.data;
};


// Update appointment
export const updateAppointmentStatus = async (
    id,
    status
) => {

    const response = await api.patch(
        `/appointments/${id}`,
        { status }
    );

    return response.data;
};