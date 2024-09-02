<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
}

const state = ref(false);
</script>

<template>
  <div class="modal-container" v-if="isOpen">
    <div class="modal">
      <a-switch
        class="lang-switch"
        v-model:checked="state"
        checked-children="Ru"
        un-checked-children="En"
      />
      <p class="description" v-if="state">
        Данный проект сделан для примера работы с API. Само API не имеет
        возможности редатировать данные на сервере а только эмулирует эти
        действия. API может работать не стабильно.
      </p>
      <p class="description" v-if="!state">
        This project is made for an example of working with the API. The API
        itself does not have the ability to edit data on the server only
        emulates these actions. The API may be unstable.
      </p>

      <a-button type="primary" @click="closeModal">{{
        state ? "Закрыть" : "Close"
      }}</a-button>
    </div>
  </div>
</template>

<style lang="css">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  min-width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 30px;
  padding: 20px;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.lang-switch {
  margin-bottom: 20px;
  align-self: flex-end;
}

.description {
  flex: 1;
  align-content: center;
}
</style>
