import { DynamoDB } from 'aws-sdk';

export const config = {
    region: process.env.AWS_REGION,
    tableName: process.env.TABLE_NAME
};

export const dynamoClient = new DynamoDB.DocumentClient({
    region: config.region
});