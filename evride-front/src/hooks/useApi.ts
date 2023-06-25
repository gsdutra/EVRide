'use client'
import axios, {AxiosRequestConfig} from 'axios';

const url: string = process.env.NEXT_PUBLIC_REACT_APP_API_URL as string;

const useApi = {
	get: (route: string, token?: string)=>axios.get(url+route, {headers: {'x-access-token': token}} as AxiosRequestConfig),

	post: (route: string, data: any, token?: string)=>axios.post(url+route, data, {headers: {'x-access-token': token}} as AxiosRequestConfig),

	put: (route: string, data: any, token?: string)=>axios.put(url+route, {headers: {'x-access-token': token}} as AxiosRequestConfig),
	
	delete: (route: string, token?: string)=>axios.delete(url+route, {headers: {'x-access-token': token}} as AxiosRequestConfig)
}

export default useApi;