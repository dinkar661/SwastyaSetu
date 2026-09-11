import api from "./api";


export const getMedicalRecords = async (
    patientId
) => {

    const response = await api.get(
        `/records/${patientId}`
    );

    return response.data;
};


export const createMedicalRecord = async (
    data
) => {

    const response = await api.post(
        "/records",
        data
    );

    return response.data;
};


export const updateMedicalRecord = async (
    id,
    data
) => {

    const response = await api.put(
        `/records/${id}`,
        data
    );

    return response.data;
};