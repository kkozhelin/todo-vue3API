<script setup lang="ts">
import { ref } from "vue";

const input = ref("");

const emit = defineEmits(["addTodo"]);

function addTodo() {
  emit("addTodo", input.value);
  input.value = "";
}
</script>

<template>
  <div class="add-todo">
    <a-input v-model:value="input" />
    <a-button type="primary" @click="addTodo" :disabled="!input">
      Add Todo
    </a-button>
  </div>
</template>

<style lang="css" scoped>
.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 24px;
  margin-top: 20px;
}
</style>
