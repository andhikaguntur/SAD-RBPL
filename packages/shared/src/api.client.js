// API client with error handling
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
class ApiClient {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }
    async request(endpoint, config = {}) {
        const { method = 'GET', headers = {}, body = null, timeout = 30000, } = config;
        const url = `${this.baseUrl}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        };
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const error = await this.parseError(response);
                throw error;
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    const timeoutError = {
                        message: 'Request timeout. Please try again.',
                        status: 408,
                    };
                    throw timeoutError;
                }
                throw {
                    message: error.message,
                    status: 0,
                    details: { originalError: error },
                };
            }
            throw error;
        }
    }
    async parseError(response) {
        let errorMessage = 'An error occurred';
        let details;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            details = errorData.details;
        }
        catch {
            errorMessage = response.statusText || errorMessage;
        }
        return {
            message: errorMessage,
            status: response.status,
            details,
        };
    }
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    async post(endpoint, body) {
        return this.request(endpoint, { method: 'POST', body });
    }
    async patch(endpoint, body) {
        return this.request(endpoint, { method: 'PATCH', body });
    }
    async put(endpoint, body) {
        return this.request(endpoint, { method: 'PUT', body });
    }
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}
export const apiClient = new ApiClient();
