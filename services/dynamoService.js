import { config, dynamoClient } from "../config/dynamoConfig.js";
import { ScanCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 } from "uuid";

export default class DynamoDBService {
    static async createMessage(message, secretKey) {
        const params = {
            TableName: config.tableName,
            Item: {
                id: v4(),
                message: message,
                secretKey: secretKey,
                createdAt: new Date().toISOString()
            }
        };
        
        try {
            const command = new PutCommand(params);
            await dynamoClient.send(command);
            return true;
        } catch (error) {
            console.error("Error creating message:", error);
            return false;
        }
    }

    static async getMyMessages(secretKey) {
        const params = {
            TableName: config.tableName,
            IndexName: 'secretKey-index',
            KeyConditionExpression: 'secretKey = :sk',
            ExpressionAttributeValues: {
                ':sk': secretKey
            },
        };

        try {
            const command = new QueryCommand(params);
            const result = await dynamoClient.send(command);
           
            return await result.Items;
        } catch (error) {
            console.error("Error fetching messages:", error);

            return [];
        }
    }

    static async getAllMessages() {
        const params = {
            TableName: config.tableName,
            ProjectionExpression: "message, createdAt"
        };
        
        try {
            const command = new ScanCommand(params);
            const result = await dynamoClient.send(command);
            const data = await result.Items;

            return await result.Items;
        } catch (error) {
            console.error("Error fetching all messages :", error);
            throw error;
        }
    }
}