import axios from "axios";

const API_URL = 'http://localhost:5000/api/pagecontents/';

const SavePageContent = async (PageContent, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const response = await axios.post(API_URL, PageContent, config);
    return response.data;
}

const GetPageContents = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    const response = await axios.get(API_URL, config);
    return response.data;
}


const PageContentServices = {
    SavePageContent, GetPageContents
}

export default PageContentServices;