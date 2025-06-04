import EncryptService from './services/encryptService.js';
import  getErrorResponse  from './services/errorResponseService.js';
import DynamoDBService from './services/dynamoService.js';

export const createMessage = async (event) => {
    const { message, secretKey } = JSON.parse(event.body);

    if (!message || !secretKey)
        return getErrorResponse('Message and secret key are required', 400);

    const encryptedMessage = EncryptService.encrypt(message, secretKey);
    const isSaved = await DynamoDBService.createMessage(encryptedMessage, secretKey);

    if (!isSaved)
        return getErrorResponse('Error creating message', 500);

    return {
        statusCode: 200,
        body: JSON.stringify({ encryptedMessage }),
    };
}

export const myMessages = async (event) => {
    const secretKey = event.headers['X-Secret-Key'] || null;

    if (!secretKey)
        return getErrorResponse('Secret key is required', 400);

    const encryptedMessages = await DynamoDBService.getMyMessages(secretKey);
    const desencryptedMessages = encryptedMessages.map(encryptedMessage =>
        EncryptService.decrypt(encryptedMessage, secretKey)
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ messages: desencryptedMessages }),
    };
}

export const allMessages = async (event) => {
    const encryptedMessages = await DynamoDBService.getAllMessages();

    return {
        statusCode: 200,
        body: JSON.stringify({ messages: encryptedMessages }),
    };
}