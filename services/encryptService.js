import CryptoJS from 'crypto-js';

export default class EncryptService {
    static encrypt(message, secretKey) {
        return CryptoJS.AES.encrypt(message, secretKey).toString();
    }
    static decrypt(encryptedMessage, secretKey) {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);

        return bytes.toString(CryptoJS.enc.Utf8);
    }
}