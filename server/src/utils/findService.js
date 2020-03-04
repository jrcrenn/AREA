import list from "../list";

export default function findService(name) {
    let service = undefined;

    for (let elem of list.services) {
        if (elem.route === name)
            service = elem;
    }
    return service;
}