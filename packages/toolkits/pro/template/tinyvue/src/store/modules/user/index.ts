import { defineStore } from 'pinia';
import {
  login as userLogin,
  loginMaiil as userLoginMail,
  logout as userLogout,
  getUserInfo,
  LoginData,
  LoginDataMail,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
    sort: undefined,
    startTime: '',
    endTime: '',
    filterStatue: [],
    filterType: [],
    submit: false,
    reset: false,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Reset filter information
    resetFilterInfo() {
      this.startTime = '';
      this.endTime = '';
      this.filterStatue = [];
      this.filterType = [];
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    async loginMain(loginForm: LoginDataMail) {
      try {
        const res = await userLoginMail(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      await userLogout();

      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
  },
});

export default useUserStore;
