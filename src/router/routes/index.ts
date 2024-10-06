import {LayoutEnum} from "../../enums/LayoutEnum";
import {NO_AUTH_ROUTE, NOT_FOUND_ROUTE} from "./base";
import UserRoutes from "./modules/user";
import AdminRoutes from "./modules/admin";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
            title: '首页',
            layout: LayoutEnum.DEFAULT_LAYOUT,
            requiresAuth: false,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            layout: LayoutEnum.PAGE_LAYOUT,
            requiresAuth: false,
            hideInMenu: true,
        },
    },
    NOT_FOUND_ROUTE,
    NO_AUTH_ROUTE,
    UserRoutes,
    AdminRoutes,
]
export default routes;
