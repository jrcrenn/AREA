import findService from "./findService";

export default function findReaction(name, serviceName) {
    let service = findService(serviceName);
    let reaction = undefined;

    for (let elem of service.reactions) {
        console.log(elem);
        if (elem.name === name) {
            console.log('found');
            reaction = elem;
        }
    }
    return reaction;
}