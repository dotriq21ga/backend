export class AuthResponseDto {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: string;

    constructor(accessToken: string, expireInSeconds: number, userId: string) {
        this.accessToken = accessToken;
        this.encryptedAccessToken = "";
        this.expireInSeconds = expireInSeconds;
        this.userId = userId
    }
}