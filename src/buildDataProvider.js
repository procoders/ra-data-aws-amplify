import { parseResponse } from './parseResponse'
import { prepareQuery } from './queryBuilder'
import { API } from 'aws-amplify'

export default async options => {
    
    const {
        queries,
        mutations
    } = options;

    const raDataProvider = (type, resource, params) => {

        const query = prepareQuery(type, resource, params, queries, mutations)

        return API.graphql(query)
            .then(response => parseResponse(type, response))
            .catch(error => console.log(error))
    };

    return raDataProvider;
};
