import createApiClient from "./api.auth.service";

class AuthorizationServiceClient {

    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    async submitLogin(credentials) {
        try {
            const response = await this.api.post('/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    };

    async logOut(data) {
        return (await this.api.get("/logout", data)).data;
    }

    async requestPasswordReset(email) {
        try {
            const response = await this.api.post('/request-reset-password', { email });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const response = await this.api.post('/reset-password', { token, newPassword });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthorizationServiceClient();