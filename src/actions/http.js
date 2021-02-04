import axios from 'axios';

const instance = axios.create({
    withCredentials: true
})


export async function GET(url) {
    try {
        let response = await instance.get(url, APIKEY());
        return response;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

export async function POST(url, data) {
    try {
        let response = await instance.post(url, data, APIKEY());
        return response;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

export function APIKEY() {
    return {
        headers: {
            'X-API-KEY': ''
        }
    }
}