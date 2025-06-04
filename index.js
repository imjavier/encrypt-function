import { createMessage, myMessages, allMessages } from './controllers.js';

export const handler = async (event) => {
    const endpoint = event.path;2
    switch (endpoint) {
        case '/create-message':
            return await createMessage(event);
        case '/my-messages':
            return await myMessages(event);
        default:
            return await allMessages(event);
    }
}
