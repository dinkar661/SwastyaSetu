import api from "./api";


export const createAppointment = async (data) => {

    const response = await api.post(
        "/appointments",
        data
    );

    return response.data;
};


export const getMyAppointments = async () => {

    const response = await api.get(
        "/appointments/my"
    );

    return response.data;
};


export const getDoctorQueue = async () => {

    const response = await api.get(
        "/appointments/doctor"
    );

    return response.data;
};


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