<template>
  <Transition name="layout-transition">
    <component :is="getLayoutComponent()"></component>
  </Transition>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {LayoutEnum} from "./enums/LayoutEnum";
import router from "./router";
import BaseLayout from "@/layout/BaseLayout.vue";
import PageLayout from "@/layout/PageLayout.vue";

const layoutType = ref<string>(LayoutEnum.DEFAULT_LAYOUT);
const layoutLoaded = ref(false);

router.beforeEach((to: any, _: any, next: any) => {
  layoutType.value = to.meta.layout ?? LayoutEnum.DEFAULT_LAYOUT;
  next();
});

onMounted(() => {
  layoutLoaded.value = true;
});

function getLayoutComponent() {
  if (layoutType.value === LayoutEnum.DEFAULT_LAYOUT) {
    return BaseLayout;
  } else if (layoutType.value === LayoutEnum.PAGE_LAYOUT) {
    return PageLayout;
  }
  return null;
}
</script>
