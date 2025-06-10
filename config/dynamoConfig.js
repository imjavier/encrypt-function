import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config = {
    region: process.env.AWS_REGION,
    tableName: process.env.TABLE_NAME
};

const client = new DynamoDBClient({ region: config.region });
const dynamoClient = DynamoDBDocumentClient.from(client);

export { config, dynamoClient };