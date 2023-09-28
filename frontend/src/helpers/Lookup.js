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
    if (window.localStorage.getItem("UserAuth")){
        return JSON.parse(window.localStorage.getItem("UserAuth")).UserToken;
    }
    else return null;
}

export const clearUserDetails = () => {
    try {
    window.localStorage.clear();
    } catch(e){
        console.error(e);
    }
}