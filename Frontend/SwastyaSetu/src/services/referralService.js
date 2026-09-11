import api from "./api";


export const createReferral = async (data) => {

    const response = await api.post(
        "/referrals",
        data
    );

    return response.data;
};


export const getMyReferrals = async () => {

    const response = await api.get(
        "/referrals/my"
    );

    return response.data;
};


export const getDoctorReferrals = async () => {

    const response = await api.get(
        "/referrals/doctor"
    );

    return response.data;
};


export const updateReferralStatus = async (
    id,
    status
) => {

    const response = await api.patch(
        `/referrals/${id}`,
        { status }
    );

    return response.data;
};