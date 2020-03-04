function findParams(params, name) {
    for (let param of params) {
        if (param.name === name)
            return true;
    }
    return false;
}

export default function verifyParams(schema, params) {
    for (let param of schema) {
        if (!findParams(params, param.name))
            return false;
    }
    return true;
}