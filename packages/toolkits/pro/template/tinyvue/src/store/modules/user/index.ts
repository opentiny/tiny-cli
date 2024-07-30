import {defineStore} from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  LoginData,
  LoginDataMail,
  loginMail as userLoginMail,
  updateUserInfo,
  getUserInfo,
  getAllUser,
} from '@/api/user';
import {clearToken, getToken, setToken} from '@/utils/auth';
import {removeRouteListener} from '@/utils/route-listener';
import {UserInfo, UserState} from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '10000',
    name: 'admin',
    email: 'admin@no-reply.com',
    department: 'Tiny-Vue-Pro',
    employeeType: 'social recruitment',
    job: 'Front end',
    probationStart: '2021-04-19',
    probationEnd: '2021-10-15',
    probationDuration: '180',
    protocolStart: '2021-04-19',
    protocolEnd: '2024-04-19',
    address: '',
    status: '',
    role: '',
    sort: 1,
    startTime: '',
    endTime: '',
    filterStatus: [],
    filterType: [],
    submit: false,
    reset: false,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return state;
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
      this.filterStatus = [];
      this.filterType = [];
    },

    async updateInfo(data: UserInfo) {
      const res = await updateUserInfo(data);
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        const { token } = res.data;
        setToken(token);
        const userRes = await getUserInfo(loginForm.email)
        const userInfo = {
          id: userRes.data.id,
          name:userRes.data.name,
          email:userRes.data.email,
          role:userRes.data.role[0].name,
          department: userRes.data.department,
          employeeType: userRes.data.employeeType,
          job: userRes.data.role[0].name,
          probationStart: userRes.data.probationStart,
          probationEnd: userRes.data.probationEnd,
          probationDuration: userRes.data.probationDuration,
          protocolStart: userRes.data.protocolStart,
          protocolEnd: userRes.data.protocolEnd,
          address: userRes.data.address,
          status: userRes.data.status,
        }
        this.setInfo(userInfo);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    async loginMail(loginForm: LoginDataMail) {
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
      const data = {
        token:getToken()
      }
      await userLogout(data);
      this.resetInfo();
      clearToken();
      removeRouteListener();
    },
  },
});

export default useUserStore;
