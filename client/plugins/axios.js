import axios from "axios";

export default axios.create({

    baseURL: "http://192.168.194.98:3333/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

