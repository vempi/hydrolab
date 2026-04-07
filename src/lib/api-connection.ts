import axios from "axios";

const baseURL_API = import.meta.env.VITE_PUBLIC_BASE_API_URL || "https://hydrolab-backend-system.vercel.app"

export const api = axios.create({
    baseURL: baseURL_API
})

export function ErrorHandler(status: number | undefined, defaulterr: string | undefined): string {
    switch(status){
        case 100:
            return "Continue";
        case 101:
            return "Switching protocols";
        
        case 200:
            return "[anom]: Request successful";
        case 201:
            return "[anom]: Resource created successfully";
        case 204:
            return "[anom]: No content";
        case 301:
            return "[anom]: Resource moved permanently";
        case 302:
            return "[anom]: Resource temporarily moved";
        case 304:
            return "[anom]: Resource not modified";
        
        case 400:
            return "Bad request — invalid data sent";
        case 401:
            return "Unauthorized — please login again";
        case 402:
            return "Payment required";
        case 403:
            return "Forbidden — you don't have permission";
        case 404:
            return "Resource not found";
        case 405:
            return "Method not allowed";
        case 406:
            return "Not acceptable";
        case 408:
            return "Request timeout";
        case 409:
            return "Conflict — data already exists";
        case 410:
            return "Resource permanently removed";
        case 413:
            return "Payload too large";
        case 415:
            return "Unsupported media type";
        case 422:
            return "Validation failed";
        case 423:
            return "Resource is locked";
        case 429:
            return "Too many requests — slow down";
            
        case 500:
            return "Internal server error";
        case 501:
            return "Not implemented";
        case 502:
            return "Bad gateway";
        case 503:
            return "Service unavailable";
        case 504:
            return "Gateway timeout";
        case 507:
            return "Insufficient storage";

        case undefined:
            return "Network error — unable to reach server";
        default : 
            return defaulterr ?? "API error";
    }
}

export interface ErrorResponseAPI {
    // fast / flask api default
    detail?: string;

    // usually if you set up
    message?: string;
    msg?: string;
}