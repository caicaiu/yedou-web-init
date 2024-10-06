import {Router} from "vue-router";
import {useUserStore} from "../../store";
import NProgress from 'nprogress'


/**
 * 权限守卫
 * @param router
 */
export default function setupPermissionGuard(router: Router) {
    // 导航守卫
    router.beforeEach(async (to, _, next) => {
        NProgress.start()
        const userStore = useUserStore(); // 创建用户 store 实例
        await userStore.getUserInfo(); // 获取用户信息
        // 检查目标路由是否需要认证
        if (to.meta.requiresAuth) {
            const mustRole = to.meta.role; // 获取目标路由要求的角色
            // 需要管理员权限
            if (mustRole === 'admin') {
                if (userStore.userInfo.userRole !== "admin") {
                    next({path: '/403'}); // 没有权限，重定向到403页面
                } else {
                    next(); // 有权限，继续导航
                }
            }
            // 需要用户权限
            else if (mustRole === "user") {
                if (!userStore.userInfo.userRole) {
                    next({path: '/login', query: {redirect: to.fullPath}});// 没有权限，重定向到登录页面
                } else {
                    next(); // 有权限，继续导航
                }
            } else {
                next(); // 如果没有特定角色要求，继续导航
            }
        } else {
            next(); // 如果不需要认证，继续导航
        }
    });

    // 后置守卫
    router.afterEach((to) => {
        // 设置页面标题
        document.title = (to.meta.title || '奔跑的代码!') as string;
        NProgress.done()
    })
}
