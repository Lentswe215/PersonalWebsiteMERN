import { useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";

export const GetAPIUrl = (Endpoint) => {
    if (Endpoint)
        return `http://localhost:5000/api/${Endpoint}`;
    else
        return `http://localhost:5000/api/`;
}
export const setUserAuth = (data) => {
    try {
        localStorage.setItem("UserAuth", JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const getUserAuth = () => {
    if (window.localStorage.getItem("UserAuth")) {
        return JSON.parse(window.localStorage.getItem("UserAuth")).UserToken;
    }
    else return null;
}

export const CheckIsAuthorized = () => {
    if (window.localStorage.getItem("UserAuth")) {
        return true;
    } else
        return false;
}

export const clearUserDetails = () => {
    try {
        window.localStorage.clear();
    } catch (e) {
        console.error(e);
    }
}