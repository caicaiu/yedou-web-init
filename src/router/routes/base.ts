import {RouteRecordRaw} from "vue-router";
import NotFound from "@/views/exception/NotFound.vue";
import NoAuth from "@/views/exception/NoAuth.vue";

/**
 * 错误页面路由
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    meta: {
        hideInMenu: true,
        requiresAuth: false,
    },
    component: NotFound,
};
export const NO_AUTH_ROUTE: RouteRecordRaw = {
    path: '/404',
    name: 'noAuth',
    meta: {
        hideInMenu: true,
        requiresAuth: false,
    },
    component: NoAuth,
};
