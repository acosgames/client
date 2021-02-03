import axios from 'axios';


export async function GET(url) {
    try {
        let response = await axios.get(url, APIKEY());
        return response;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}

export async function POST(url, data) {
    try {
        let response = await axios.post(url, data, APIKEY());
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