import { enc } from 'crypto-js';
import EncryptService from './services/encryptService.js';
import  getErrorResponse  from './services/errorResponseService.js';

exports.handler = async (event) => {
    const endpoint = event.path;

    if (endpoint === '/create-message') {
        const { message, secretKey } = JSON.parse(event.body);

        if (!message || !secretKey)
            return getErrorResponse('Message and secret key are required', 400);

        const encryptedMessage = EncryptService.encrypt(message, secretKey);
        //database logic
        return {
            statusCode: 200,
            body: JSON.stringify({ encryptedMessage }),
        };
    }
    else if (endpoint === '/my-messages') {
        const secretKey = event.headers['X-Secret-Key'] || null;

        if (!secretKey)
            return getErrorResponse('Secret key is required', 400);

        //database logic
        const encryptedMessages = [];
        const desencryptedMessages = encryptedMessages.map(encryptedMessage => 
            EncryptService.decrypt(encryptedMessage, secretKey)
        );
        return {
            statusCode: 200,
            body: JSON.stringify({ messages: desencryptedMessages }),
        };
    }
    else {
        // database logic
        const encryptedMessages = []
        return {
            statusCode: 200,
            body: JSON.stringify({ messages: encryptedMessages }),
        };
    }
}