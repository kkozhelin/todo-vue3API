<script setup lang="ts">
import { ref } from "vue";

import { UpOutlined } from "@ant-design/icons-vue";

const isOpen = ref(false);
function toggleOpen() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div style="height: 60px">
    <div @click="toggleOpen">
      <a-flex align="center" gap="middle" :style="{ cursor: 'pointer' }">
        <span>Login information </span
        ><UpOutlined :class="{ 'open-icon': isOpen }" />
      </a-flex>
    </div>
    <transition name="fade">
      <a-flex vertical align="flex-start" v-if="isOpen" style="pointer:">
        <span>Username: emilys</span>
        <span>Password: emilyspass</span>
      </a-flex>
    </transition>
  </div>
</template>

<style lang="css" scoped>
.open-icon {
  transform: rotate(180deg);
}
</style>
