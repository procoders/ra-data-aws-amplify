import {Auth} from "aws-amplify/lib/index";
import AWSAppSyncClient from "aws-appsync";

export default options => {

    const { aws_exports } = options;

    return new AWSAppSyncClient({
        url: aws_exports.aws_appsync_graphqlEndpoint,
        region: aws_exports.aws_appsync_region,
        auth: {
            type: aws_exports.aws_appsync_authenticationType,
            jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
        },
        complexObjectsCredentials: () => Auth.currentCredentials(),
    });
};
