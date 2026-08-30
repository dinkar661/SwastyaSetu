import axiosClient from "./axiosClient";


const appointmentService = {

    createAppointment: async (data) => {

        const response =
            await axiosClient.post(
                "/appointments",
                data
            );

        return response.data;
    },


    getDoctorQueue: async () => {

        const response =
            await axiosClient.get(
                "/appointments/doctor"
            );

        return response.data;
    },


    getMyAppointments: async () => {

        const response =
            await axiosClient.get(
                "/appointments/my"
            );

        return response.data;
    }

};


export default appointmentService;