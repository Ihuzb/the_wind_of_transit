const axios = require("axios");

let config = {
    baseURL: 'http://43.143.203.246:3000',
    timeout: 5 * 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);


const myGet = (url, params = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
        _axios
            .get(url, {
                params: params,
                headers
            })
            .then(({data}) => {
                if (data.code == 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}


const myPost = (url, data = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
        _axios
            .post(url, data, headers)
            .then(({data}) => {
                if (data.code == 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
global.axios = {
    myGet, myPost
}
