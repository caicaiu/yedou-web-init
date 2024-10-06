import {RouteRecordRaw} from "vue-router";

/**
 * 用户路由
 */
const UserRoutes: RouteRecordRaw = {
    path: '/user',
    name: 'user',
    meta: {
        title: '用户',
        requiresAuth: true,
        role: "user"
    },
    children: []
};

export default UserRoutes;
