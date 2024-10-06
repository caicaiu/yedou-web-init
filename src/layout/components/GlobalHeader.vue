<template>
  <a-row id="global-header">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="[defaultRoutes]" @menu-item-click="doMenuClick">
        <a-menu-item key="0" style="cursor: pointer" @click="router.push('/')">
          <div class="header-logo-mix">
            <img height="22" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="夜斗">
            <h1>Arco Design Vue</h1>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{ item?.meta?.title }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="150px">
      <a-dropdown v-if="user.isLogin" @select="handleSelect" trigger="hover">
        <div class="user-info">
          <a-avatar>
            <img
                alt="avatar"
                :src="userInfo.userPicUrl"
            />
          </a-avatar>
        </div>
        <template #content>
          <a-doption>
            <a-space @click="router.push('/user/info')">
              <icon-user/>
              <span>
                个人中心
                </span>
            </a-space>
          </a-doption>
          <a-doption>
            <a-space @click="handleLogout">
              <icon-export/>
              <span>
                退出登录
                </span>
            </a-space>
          </a-doption>
        </template>
      </a-dropdown>
      <div class="user-info" v-else>
        <a-avatar @click="handleLogin" style="cursor: pointer">未登录</a-avatar>
      </div>
    </a-col>
  </a-row>

</template>
<script setup lang="ts">
import {computed} from "vue";
import {Message} from "@arco-design/web-vue";
import {RouteMeta, useRouter} from "vue-router";
import {useUserStore} from "../../store/index";
import routes from "../../router/routes/index";

const router = useRouter()
const defaultRoutes = computed(() => {
  return router.currentRoute.value.path
})
const user = useUserStore()

const userInfo = computed(() => {
  return user.userInfo;
});
const handleLogin = () => {
  const redirect = router.currentRoute.value.fullPath;
  router.push({
    path: '/login',
    query: {
      redirect: redirect
    }
  });
}
const doMenuClick = (key: string) => {
  router.push(key);
}

const handleSelect = (v: any) => {
  console.log(v)
};
const checkAccess = (route: RouteMeta): boolean => {
  const userRole = userInfo.value.userRole; // 假设这是获取当前用户角色的方法
  const requiredRole = route.role; // 获取路由要求的角色
  console.log(userRole, requiredRole, 'userRole, requiredRole')
  // 需要管理权限，但是当前用户不是管理员
  if (requiredRole === 'admin' && userRole !== 'admin') {
    return false;
  }
  // 其他权限省略
  return true;
};
const visibleRoutes = computed(() => {
  return routes.filter((item: any) => {
    const hideInMenu = item?.meta?.hideInMenu ?? false;
    if (!checkAccess(item?.meta)) {
      return false;
    }
    if (hideInMenu === true) {
      return false;
    } else {
      return true;
    }
  });
});
const handleLogout = async () => {
  await user.userLogout();
  Message.success('登出成功');
  router.push('/');
};


</script>
<style scoped>
#global-header {
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
}

#global-header :deep(.arco-menu-selected-label) {
  bottom: -5px;
}

.user-info {
  display: flex;
  height: 60px;
  max-width: 100px;
  align-items: center;
  justify-content: center;
}

.header-logo-mix {
  display: flex;
  align-items: center;

}

.header-logo-mix h1 {
  height: 32px;
  margin-block: 0;
  margin-inline: 0;
  margin-inline-start: 8px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.88);
  font-size: 16px;
  line-height: 32px;
}

.user-trigger {
  background: #fff;
}

.user-name {
  font-size: 14px;
  margin-left: 10px;
}
</style>
