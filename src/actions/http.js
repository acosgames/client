import axios from 'axios';

const instance = axios.create({
    withCredentials: true
})


export async function GET(url, extras) {
    try {
        let response = await instance.get(url, HEADERS(extras));
        return response;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

export async function POST(url, data, extras) {
    try {
        let response = await instance.post(url, data, HEADERS(extras));
        return response;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

export function HEADERS(extras) {
    return {
        headers: {
            'X-API-KEY': ''
        },
        ...extras
    }
}