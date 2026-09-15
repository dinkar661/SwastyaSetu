import api from "./api";


// Get logged-in patient's medical records

export const getMyMedicalRecords = async () => {

    const response = await api.get(
        "/records/my"
    );

    return response.data;
};


// // Get a specific patient's medical records
// // Used by Doctor / Health Worker

export const getMedicalRecords = async (patientId) => {

    const response = await api.get(
        `/records/patient/${patientId}`
    );

    return response.data;
};


// Create medical record
// Used by Doctor
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