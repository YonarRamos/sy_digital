import axios from "axios";

export default axios.create({

    baseURL: "http://127.0.0.1:3333/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

