<template>
  <a-layout style="height: 400px;">
    <a-layout-header>
      <GlobalHeader></GlobalHeader>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer>
      <div class="footer">
        夜斗云后台管理系统
      </div>
    </a-layout-footer>
  </a-layout>

</template>
<script setup lang="ts">
import GlobalHeader from "@/layout/components/GlobalHeader.vue";
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #00c9ff, #92fe9d, #40a9ff, #00c9ff);
}
</style>
