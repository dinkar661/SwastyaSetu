import axiosClient from "./axiosClient";


const patientService = {

    createPatient: async (data) => {

        const response =
            await axiosClient.post(
                "/patients",
                data
            );

        return response.data;
    },


    getPatient: async (id) => {

        const response =
            await axiosClient.get(
                `/patients/${id}`
            );

        return response.data;
    },


    getPatients: async () => {

        const response =
            await axiosClient.get(
                "/patients"
            );

        return response.data;
    }

};


export default patientService;