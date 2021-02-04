import { POST } from './http';


export async function createDisplayName(displayname) {

    try {
        let response = await POST('/person/create/displayname', { displayname });
        let user = response.data;
        console.log(user);
        return user;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}