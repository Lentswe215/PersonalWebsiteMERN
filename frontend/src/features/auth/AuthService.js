import axios from "axios";
import {
    setUserAuth
} from "../../helpers/Lookup";
import moment from "moment";

const API_URL = 'http://localhost:5000/api/account/';

//Login User
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const LoginUser = async (userData) => {
    const response = await axios.get(API_URL + `login/${userData.username}/${userData.password}`, config);
    if (response.data) {
        const AuthToken = {
            UserToken: response.data.AuthToken,
            expires: moment().add(1, "hour")
        }
        setUserAuth(AuthToken);

        return response.data.AuthToken;
    }
}

const authService = {
    LoginUser
}

export default authService;