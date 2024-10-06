import {defineStore} from "pinia";
import {UserState} from "./type";
import {
    getLoginUserPermitNullUsingGet, userLoginByAccountUsingPost,
    UserLoginByEmailRequest, userLoginByEmailUsingPost,
    UserLoginRequest,
    userLogoutUsingPost
} from "../../../api/user";
import {clearToken, setToken} from "../../../utils/auth";

export const useUserStore = defineStore('user', {
    state: () => ({
        loginUserVo: {} as UserState,
    }),

    actions: {
        resetInfo() {
            this.$reset();
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch({
                loginUserVo: partial,
            });
        },

        // Get user's information
        async getUserInfo() {
            const res = await getLoginUserPermitNullUsingGet();
            this.setInfo(res.data)
        },


        // Logout
        async userLogout() {
            try {
                await userLogoutUsingPost();
            } finally {
                this.logoutCallBack();
            }
        },
        logoutCallBack() {
            this.resetInfo();
            clearToken();
        },


        async userLoginByAccount(loginForm: UserLoginRequest) {
            try {
                const res = await userLoginByAccountUsingPost(loginForm);
                setToken(res.data);
            } catch (err) {
                clearToken();
                throw err;
            }
        },
        async userLoginByEmail(loginForm: UserLoginByEmailRequest) {
            try {
                const res = await userLoginByEmailUsingPost(loginForm);
                setToken(res.data);
            } catch (err) {
                clearToken();
                throw err;
            }
        },


    },
    getters: {
        userInfo(state): UserState {
            return {...state.loginUserVo};
        },

        isLogin(state): boolean {
            // 判断用户是否已登录，假设当 userName 存在时为已登录
            return !!state.loginUserVo?.userRole;
        },

    },
});
