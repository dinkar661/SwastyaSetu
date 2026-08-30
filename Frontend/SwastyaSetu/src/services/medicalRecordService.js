import axiosClient from "./axiosClient";


const medicalRecordService = {

    createRecord: async (data) => {

        const response =
            await axiosClient.post(
                "/medical-records",
                data
            );

        return response.data;
    },


    getPatientRecords: async (
        patientId
    ) => {

        const response =
            await axiosClient.get(
                `/medical-records/patient/${patientId}`
            );

        return response.data;
    }

};


export default medicalRecordService;