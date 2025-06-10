import { createMessage, myMessages, allMessages } from './controllers.js';

export const handler = async (event) => {
    const path = event.requestContext?.http?.path || event.path;
    const method = event.requestContext?.http?.method || event.httpMethod;

    switch (`${method} ${path}`) {
        case 'POST /create-message':
            return await createMessage(event);
        case 'GET /my-messages':
            return await myMessages(event);
        case 'GET /all':
            return await allMessages(event);
    }
}
