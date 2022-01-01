import axios from 'axios';
import fs from 'flatstore';

const instance = axios.create({
    withCredentials: true
})


export async function GET(url, extras) {
    let response = await instance.get(url, HEADERS(extras));

    if (response.data && response.data.ecode) {
        let ecode = response.data.ecode;
        if (ecode == 'E_NOTAUTHORIZED' && url != '/api/v1/person') {
            let history = fs.get('history');
            history.push('/login');
        }
    }
    return response;
}

export async function POSTFORM(url, data, extras) {
    let config = HEADERS(extras);
    config.headers['Content-Type'] = 'multipart/form-data';
    let response = await instance.post(url, data, config);
    if (response.data && response.data.ecode) {
        let ecode = response.data.ecode;
        if (ecode == 'E_NOTAUTHORIZED') {
            let history = fs.get('history');
            history.push('/login');
        }
    }
    return response;
}

export async function POST(url, data, extras) {
    let response = await instance.post(url, data, HEADERS(extras));
    if (response.data && response.data.ecode) {
        let ecode = response.data.ecode;
        if (ecode == 'E_NOTAUTHORIZED') {
            let history = fs.get('history');
            history.push('/login');
        }
    }
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