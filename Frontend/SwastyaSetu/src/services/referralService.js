import axiosClient from "./axiosClient";


const referralService = {

    createReferral: async (data) => {

        const response =
            await axiosClient.post(
                "/referrals",
                data
            );

        return response.data;
    },


    getPatientReferrals: async (
        patientId
    ) => {

        const response =
            await axiosClient.get(
                `/referrals/patient/${patientId}`
            );

        return response.data;
    },


    getDoctorReferrals: async () => {

        const response =
            await axiosClient.get(
                "/referrals/doctor"
            );

        return response.data;
    }

};


export default referralService;