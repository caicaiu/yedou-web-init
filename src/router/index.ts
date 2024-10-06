import createRouteGuard from "./guard";
import routes from "./routes";
import NProgress from "nprogress";
import {createRouter, createWebHistory} from 'vue-router'

NProgress.configure({showSpinner: false}); // NProgress Configuration
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {top: 0};
    },
});

createRouteGuard(router);

export default router;
