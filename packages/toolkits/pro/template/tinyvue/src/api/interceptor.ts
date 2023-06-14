import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Modal } from '@opentiny/vue';
import locale from '@opentiny/vue-locale';
import router from '@/router';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  errMsg: string;
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

    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code !== '0') {
      res.errMsg &&
        Modal.message({
          message: res.errMsg,
          status: 'error',
        });
      return Promise.reject(new Error(res.errMsg || 'Error'));
    }
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      router.replace({ name: 'login' });
      Modal.message({
        message: locale.t('http.error.TokenExpire'),
        status: 'error',
      });
    }

    return Promise.reject(error);
  }
);
