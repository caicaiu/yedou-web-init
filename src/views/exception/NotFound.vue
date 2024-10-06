<template>
  <a-result status="404" subtitle="Whoops, that page is gone.">
    <template #extra>
      <a-space>
        <a-button @click="$router.push('/')" type="primary">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>
<script setup>
import {createRouter as $router} from "vue-router";
</script>
