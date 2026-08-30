import axiosClient from "./axiosClient";


const triageService = {

    assess: async (data) => {

        const response =
            await axiosClient.post(
                "/triage",
                data
            );

        return response.data;
    }

};


export default triageService;