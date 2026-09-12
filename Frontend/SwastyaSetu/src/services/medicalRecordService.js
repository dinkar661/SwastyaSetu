import api from "./api";


// Get all medical records of a patient
export const getMedicalRecords = async (patientId) => {

    const response = await api.get(
        `/records/${patientId}`
    );

    return response.data;
};


// Create medical record
export const createMedicalRecord = async (data) => {

    const response = await api.post(
        "/records",
        data
    );

    return response.data;
};


// Update medical record
export const updateMedicalRecord = async (id, data) => {

    const response = await api.put(
        `/records/${id}`,
        data
    );

    return response.data;
};