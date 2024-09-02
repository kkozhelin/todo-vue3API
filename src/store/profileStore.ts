import { ref } from "vue";
import { defineStore } from "pinia";

import { loginVerification } from "@/helpers/API";

import type { ProfileData } from "@/types/profileData";

export const useProfileStore = defineStore("profile", () => {
  const profileData = ref<ProfileData | {}>({});
  const isLoading = ref(false);
  const isAuthenticated = ref(false);

  async function checkAuth() {
    isLoading.value = true;
    try {
      const response = await loginVerification();
      if (!response.ok) {
        isAuthenticated.value = false;
        return;
      }
      const { id, username, email, firstName, lastName, gender, image } =
        await response.json();
      const profileData: ProfileData = {
        id,
        username,
        email,
        firstName,
        lastName,
        gender,
        image,
      };
      setProfileData(profileData);
      isAuthenticated.value = true;
    } catch (error) {
      console.error(error);
      isAuthenticated.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  function setProfileData(data: ProfileData | {}) {
    profileData.value = data;
  }

  return {
    profileData,

    isLoading,
    isAuthenticated,

    setProfileData,
    checkAuth,
  };
});
