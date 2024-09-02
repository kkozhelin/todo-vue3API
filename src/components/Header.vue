<script setup lang="ts">
import lable from "@/assets/lable.vue";

import { useRouter } from "vue-router";

import { useProfileStore } from "@/store/profileStore";

import type { ProfileData } from "@/types/profileData";

const profileStore = useProfileStore();
const router = useRouter();

const profileData = profileStore.profileData!;

function logout() {
  localStorage.removeItem("tokenTodo");
  router.push({ name: "Authorization" });
  profileStore.setProfileData({});
}
</script>
<template>
  <header>
    <lable />
    <div>
      <nav class="menu">
        <span>Hellow {{ (profileData as ProfileData).username }} !</span>
        <img
          :src="(profileData as ProfileData).image"
          alt="user_logo"
          class="user-logo"
        />
        <a-button type="primary" @click="logout()">logout</a-button>
      </nav>
    </div>
  </header>
</template>

<style lang="css" scoped>
header {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: #f0f0f0;
}

.menu {
  display: flex;
  gap: 10px;
  align-items: center;
}

.user-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
