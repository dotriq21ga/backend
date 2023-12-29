export class ApiAuthResponse {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;

    constructor(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, userId: number) {
        this.accessToken = accessToken;
        this.encryptedAccessToken = encryptedAccessToken;
        this.expireInSeconds = expireInSeconds;
        this.userId = userId
    }
}