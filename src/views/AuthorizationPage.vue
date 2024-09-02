<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import Form from "@/components/AuthorizationPage/Form.vue";
import LoginData from "@/components/AuthorizationPage/LoginData.vue";

import { useProfileStore } from "@/store/profileStore";

const profileStore = useProfileStore();

const router = useRouter();

onBeforeMount(async () => {
  if (profileStore.isAuthenticated) {
    router.push({ name: "todos" });
  }
});
</script>

<template>
  <div class="container" v-if="!profileStore.isLoading">
    <Form />

    <LoginData />
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}
</style>
