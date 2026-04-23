export interface RequestConfig {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
}
declare class ApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    private request;
    private parseError;
    get<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, body: any): Promise<T>;
    patch<T>(endpoint: string, body: any): Promise<T>;
    put<T>(endpoint: string, body: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
}
export declare const apiClient: ApiClient;
export {};
//# sourceMappingURL=api.client.d.ts.map