import {RouteRecordRaw} from "vue-router";

const AdminRoutes: RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    meta: {
        title: 'admin',
        requiresAuth: true,
        role: 'admin'
    },
    component: () => import('@/views/login/index.vue')
};

export default AdminRoutes;
