<script setup lang="ts">
import { changeTodo, deleteTodo } from "@/helpers/API";
import notificationWindow from "@/helpers/notificationWindow";

import type { Todo } from "@/types/todos";

defineProps<{
  todos?: Todo[];
  isLoading: boolean;
}>();

const emit = defineEmits(["updateTodo", "deleteTodo"]);

function getUpdateTodo(idTodo: number, completed: boolean) {
  changeTodo(idTodo, completed);
  notificationWindow({
    type: "success",
    message: "Todo updated",
    description: "Todo was updated successfully",
  });
  // emit("updateTodo");
}

function getDeleteTodo(todo: Todo) {
  deleteTodo(todo.id);
  emit("deleteTodo", todo);
  // emit("updateTodo");
}
</script>

<template>
  <main v-if="!isLoading">
    <a-list>
      <a-list-item v-for="todo in todos" :key="todo.id" class="todo">
        <span class="todo-text" :class="{ done: todo.completed }">{{
          todo.todo
        }}</span>
        <div class="actions">
          <a-checkbox
            v-model:checked="todo.completed"
            @change="getUpdateTodo(todo.id, todo.completed)"
            >Done</a-checkbox
          >
          <a-button type="primary" danger @click="getDeleteTodo(todo)">
            Delete
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </main>
</template>

<style lang="css" scoped>
.todo {
  display: flex;
}

.actions {
  display: flex;
  gap: 10px;
  place-items: center;
}

.todo-text {
  flex: 1;
  margin-right: 10px;
}

.done {
  text-decoration: line-through;
}
</style>
