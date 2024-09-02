<
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import notificationWindow from "@/helpers/notificationWindow";

import { useProfileStore } from "@/store/profileStore";

import { signIn } from "@/helpers/API";

import type { ProfileData, FormState } from "@/types/profileData";

const formState = reactive<FormState>({
  username: "",
  password: "",
});

const profileStore = useProfileStore();

const $router = useRouter();

async function onFinish() {
  try {
    const response = await signIn(formState);
    if (!response.ok) {
      const errorMessage =
        response.status === 400
          ? "Specify the correct login information"
          : "An unexpected error occurred";

      notificationWindow({
        type: "error",
        message: "Login failed",
        description: errorMessage,
      });
      return;
    }

    const data: ProfileData = await response.json();
    profileStore.setProfileData(data);

    notificationWindow({
      type: "success",
      message: "The username is correct",
      description: "You have successfully logged in",
    });

    localStorage.setItem("tokenTodo", data.token!);

    $router.push({ name: "todos" });
  } catch (error) {
    notificationWindow({
      type: "error",
      message: "Login failed",
      description: "An unexpected error occurred",
    });
    console.error(error);
  }
}

function onFinishFailed() {
  notificationWindow({
    type: "error",
    message: "Login failed",
    description: "Specify the correct login information",
  });
}
</script>

<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
