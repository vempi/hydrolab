import { useEffect, useState } from "react";
import { api, ErrorHandler, type ErrorResponseAPI } from "./api-connection";
import axios from "axios";

export function useFetchData<TResponse>(url: string){
    const [data, setData] = useState<TResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const fetchFunc = async () => {
            setIsLoading(true);
            try {
                const resp = await api.get<TResponse>(url);
                setData(resp.data);
                setErr(null);
            } catch (error) {
                if (axios.isAxiosError<ErrorResponseAPI>(error)){
                    const status = error.response?.status;
                    setErr(ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail ?? error.response?.data.msg))
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchFunc()
    }, [url])

    

    return {data, isLoading, err}
}

export const execvFetchFunc = async<TResponse> (url: string) => {
    try {
        const resp = await api.get<TResponse>(url);
        return resp.data;
    } catch (error) {
        if (axios.isAxiosError<ErrorResponseAPI>(error)){
            const status = error.response?.status;
            const err = ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail ?? error.response?.data.msg)
            return err
        }
    }
}

export function usePostData<TResponse, Tbody>(){
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const exec = async (url: string, body: Tbody) => {
        try {
            setLoading(true);
            setErr(null);
            const response = await api.post<TResponse>(url, body);
            setData(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError<ErrorResponseAPI>(error)){
                const status = error.response?.status;
                setErr(ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail))
            } else {
                setErr("Unknown error")
            }
        } finally {
            setLoading(false)
        }
    }

    return {exec, data, loading, err}
}

export function usePatchData<TResponse, Tbody>(){
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const exec = async (url: string, body: Tbody) => {
        try {
            setLoading(true);
            setErr(null);
            const response = await api.patch<TResponse>(url, body);
            setData(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError<ErrorResponseAPI>(error)){
                const status = error.response?.status;
                setErr(ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail))
            } else {
                setErr("Unknown error")
            }
        } finally {
            setLoading(false)
        }
    }

    return {exec, data, loading, err}
}

export function usePutData<TResponse, Tbody>(){
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const exec = async (url: string, body: Tbody) => {
        try {
            setLoading(true);
            setErr(null);
            const response = await api.put<TResponse>(url, body);
            setData(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError<ErrorResponseAPI>(error)){
                const status = error.response?.status;
                setErr(ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail))
            } else {
                setErr("Unknown error")
            }
        } finally {
            setLoading(false)
        }
    }

    return {exec, data, loading, err}
}

export function useDeleteData<TResponse, Tbody>(){
    const [data, setData] = useState<TResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const exec = async (url: string, body: Tbody) => {
        try {
            setLoading(true);
            setErr(null);
            const response = await api.delete<TResponse>(url, {data: body});
            setData(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError<ErrorResponseAPI>(error)){
                const status = error.response?.status;
                setErr(ErrorHandler(status, error.response?.data.message ?? error.response?.data.detail))
            } else {
                setErr("Unknown error")
            }
        } finally {
            setLoading(false)
        }
    }

    return {exec, data, loading, err}
}