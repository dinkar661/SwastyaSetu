import api from "./api";


export const performTriage = async (data) => {

    const response = await api.post(
        "/triage",
        data
    );

    return response.data;
};