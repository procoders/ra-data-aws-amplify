import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'ra-core';

export const parseResponse = (type, response) => {
    const queryName = Object.keys(response['data'])[0]
    switch (type) {
        case GET_LIST:
            return {
                data: response['data'][queryName]['items'],
                total: response['data'][queryName]['items'].length
            }
        case GET_ONE:
        case GET_MANY:
        case GET_MANY_REFERENCE:
        case UPDATE:
        case CREATE:
        case DELETE:
            return { data: response['data'][queryName] }
        default:
            return { data: response.data };
    }
};