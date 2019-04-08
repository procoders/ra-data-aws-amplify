import { graphqlOperation } from "aws-amplify";
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from 'ra-core';

export const prepareQuery = (type, resource, params, quieriesQL, mutationsQl) => {

    const queryNames = {
        GET_LIST : resource => `list${resource}s`,
        GET_ONE: resource => `get${resource}`,
        GET_MANY: resource => `list${resource}s`,
        GET_MANY_REFERENCE: resource => `list${resource}s`,
        CREATE: resource => `create${resource}`,
        UPDATE: resource => `update${resource}`,
        DELETE: resource => `delete${resource}`,
    }
    const queryName = queryNames[type](resource)

    const graphQLQueries = [GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE].includes(type)
        ? quieriesQL[queryName]
        : mutationsQl[queryName]

    const graphQLQuery = graphqlOperation(graphQLQueries)

    switch (type) {
        case GET_LIST:
        case GET_MANY_REFERENCE: {
            // const { page, perPage } = params.pagination;
            // const { field, order } = params.sort;
            // graphQLQuery.variables = {
            //     sort: [field, order],
            //     range: [(page - 1) * perPage, page * perPage - 1],
            //     filter: params.filter,
            // };
            return graphQLQuery
        }
        case GET_ONE: {
            graphQLQuery.variables.id = params.id
            return graphQLQuery
        }
        case GET_MANY: {
            graphQLQuery.variables = {
                filter: { id: params.ids },
            };
            return graphQLQuery
        }
        case CREATE:
        case UPDATE: {
            graphQLQuery.variables.input = params.data
            return graphQLQuery
        }
        case DELETE: {
            graphQLQuery.variables = {
                input: {
                    id: params.id
                }
            }
            return graphQLQuery
        }
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};