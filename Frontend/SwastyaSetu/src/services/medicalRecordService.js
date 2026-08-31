import axiosClient from "./axiosClient";


const medicalRecordService = {

    createRecord: async (data) => {

        const response =
            await axiosClient.post("/records/",data);

        return response.data;
    },


    getPatientRecords: async (patientId) => {

        const response =
            await axiosClient.get(`/records/${patientId}`);

        return response.data;
    }

};


export default medicalRecordService;