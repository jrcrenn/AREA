import sha512 from 'js-sha512';

const url = process.env.API_URL || 'http://localhost:36969';
var apiToken = undefined;

async function register(username, password) {
    password = sha512(password);
    let response = await fetch(`${url}/auth/signup?username=${username}&password=${password}`, {
        method: 'POST',
    });
    response = await response.json();
    return response;
}

async function login(username, password) {
    password = sha512(password);
    let response = await fetch(`${url}/auth/signin?username=${username}&password=${password}`, {
        method: 'POST',
    });
    response = await response.json();
    return response;
}

async function verifyToken(token) {
    apiToken = token;
    let response = await fetch(`${url}/auth/verify?token=${token}`, {
        method: 'GET',
    });
    response = await response.json();
    return response;
}

async function fetchServices() {
    let response = await fetch(`${url}/list`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    console.log(response);
    return response;
}

async function connectTo(serviceName, params)
{
    let actualUrl = `${url}/service/connect`;
    let response = await fetch(actualUrl, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({name: serviceName, params: params}),
    });
    response = await response.json();
    return response;
}

async function getSubscribedServices() {
    let response = await fetch(`${url}/service/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    console.log(response);
    return response;
}

async function link(action, actionParams, reaction, reactionParams) {
    const data = {
        action: {name: action.name, serviceName: action.serviceName, params: actionParams},
        reaction: {name: reaction.name, serviceName: reaction.serviceName, params: reactionParams}
    };
    let response = await fetch(`${url}/link`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(data)
    });
    response = await response.json();
    console.log(response);
    return response;
}

export default {register, login, verifyToken, fetchServices, connectTo, getSubscribedServices, link};
