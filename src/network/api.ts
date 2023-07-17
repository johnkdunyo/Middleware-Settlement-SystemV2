'use client'

import axios, { AxiosError, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";




const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.log("interceptor res", response);
  // console.info(`[response] [${JSON.stringify(response)}]`);
  // do nothing
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.statusText === "Unauthorized") {
    signOut({callbackUrl: "/auth/signin"});
  }
  if (error.response?.status === 442) {
    signOut({callbackUrl: "/auth/signin"});
  }

  return Promise.reject(error);
};


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});




instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.common["Content-Type"] = "application/json", 
instance.defaults.headers.common["Accept"] = "application/json";
instance.defaults.headers.common["Content-Type"] =  'multipart/form-data'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// remove x-powered by ...
delete instance.defaults.headers.common["X-Powered-By"];

instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
