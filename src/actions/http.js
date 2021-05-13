import axios from 'axios';

const instance = axios.create({
    withCredentials: true
})


export async function GET(url, extras) {
    let response = await instance.get(url, HEADERS(extras));
    return response;
}

export async function POSTFORM(url, data, extras) {
    let config = HEADERS(extras);
    config.headers['Content-Type'] = 'multipart/form-data';
    let response = await instance.post(url, data, config);
    return response;
}

export async function POST(url, data, extras) {
    let response = await instance.post(url, data, HEADERS(extras));
    return response;
}

export function HEADERS(extras) {
    if (extras) {
        return {
            ...extras
        }
    }

    return {
    }
}