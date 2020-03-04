import findService from "./findService";

export default function findAction(name, serviceName) {
    let service = findService(serviceName);
    let action = undefined;

    for (let elem of service.actions) {
        console.log(elem);
        if (elem.name === name) {
            console.log('found');
            action = elem;
        }
    }
    return action;
}