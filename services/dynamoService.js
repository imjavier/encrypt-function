import { config, dynamoClient } from "../config/dynamoConfig.js";
import { v4 } from "uuid";

export default class DynamoDBService {
    static async createMessage(message, secretKey){
        const params = {
            TableName: config.tableName,
            Item: {
                id: v4(),
                message: message,
                secretKey: secretKey,
            }
        }
        try {
            await dynamoClient.put(params).promise();
            return true;
        } catch (error) {
            console.error("Error creating message:", error);
            return false
        }
    }
    static async getMyMessages(secretKey) {
        const params = {
            TableName: config.tableName,
            KeyConditionExpression: 'secretKey = :sk',
            ExpressionAttributeValues: {
                ':sk': secretKey
            }
        };

        try{
            const result = await dynamoClient.query(params).promise();
            return result.Items || [];
        }catch{
            console.error("Error fetching messages:", error);
            return [];
        }
    }

    static async getAllMessages() {
         const params = {
            TableName: config.tableName
        };

        try {
            const result = await dynamoClient.scan(params).promise();
            return result.Items || [];
        } catch (error) {
            console.error("Error obteniendo todos los mensajes:", error);
            return [];
        }
    }
}

