import api from "./api";


// Create referral
export const createReferral = async (data) => {

    const response = await api.post(
        "/referrals",
        data
    );

    return response.data;
};


// Patient's referrals
export const getMyReferrals = async () => {

    const response = await api.get(
        "/referrals/my"
    );

    return response.data;
};


// Doctor's referrals
export const getDoctorReferrals = async () => {

    const response = await api.get(
        "/referrals/doctor"
    );

    return response.data;
};


// Update referral status
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