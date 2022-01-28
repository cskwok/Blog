const apiHost = "http://localhost:5000/api";

function api(param) {
    return apiHost + param;
}

function authHeader(token) {
    const t = "bearer " + token;
    return {
        headers: {
            "Content-Type": "application/json",
            "authorization": t
        }
    }
}

const axiosOptions = {
    withCredentials: true
}

export default {
    api,
    authHeader,
    axiosOptions
};