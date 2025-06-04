import EncryptService from './services/encryptService.js';
import  getErrorResponse  from './services/errorResponseService.js';

export const createMessage = (event) => {
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

export const myMessages = (event) => {
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

export const allMessages = (event) => {
    // database logic
    const encryptedMessages = [];
    return {
        statusCode: 200,
        body: JSON.stringify({ messages: encryptedMessages }),
    };
}