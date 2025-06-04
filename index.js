import { enc } from 'crypto-js';
import { createMessage, myMessages, allMessages } from './controllers.js';

exports.handler = async (event) => {
    const endpoint = event.path;2
    switch (endpoint) {
        case '/create-message':
            return createMessage(event);
        case '/my-messages':
            return myMessages(event);
        default:
            return allMessages(event);
    }
}