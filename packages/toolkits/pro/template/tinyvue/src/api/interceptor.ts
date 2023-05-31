import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Modal } from '@opentiny/vue';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: string | number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    const regex = /[;\s+]?csrfToken=([^;]*)/;
    if (!document.cookie.match(regex)) {
      try {
        await fetch('/api/v1/setcsrf');
      } catch (e) {
        throw e;
      }
    }
    const [, csrfToken] = regex.exec(document.cookie) || [];

    config.headers = { ...config.headers, 'x-csrf-token': csrfToken };

    return config;
  },
  error => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code !== '0') {
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.message({
          message:
            'You have been logged out, you can cancel to stay on this page, or log in again',
          status: 'error'
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);
