<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import Header from "@/components/Header.vue";
import AddTodo from "@/components/TodosPage/AddTodo.vue";
import TodosList from "@/components/TodosPage/TodosList.vue";
import notificationWindow from "@/helpers/notificationWindow";

import { useProfileStore } from "@/store/profileStore";

import { addTodo, getAllTodos } from "@/helpers/API";

import type { ProfileData } from "@/types/profileData";
import type { Todo } from "@/types/todos";

const profileData = useProfileStore().profileData;

const isLoading = ref(false);

const todos = ref<Todo[]>();

onBeforeMount(async () => {
  getTodosList();
});

async function getTodosList() {
  isLoading.value = true;
  try {
    const responce = await getAllTodos((profileData as ProfileData).id);
    if (!responce.ok) {
      notificationWindow({
        type: "error",
        message: "Get todos failed",
        description: "An unexpected error occurred",
      });
      return;
    }

    const data = await responce.json();
    todos.value = data.todos;
  } catch (error) {
    notificationWindow({
      type: "error",
      message: "Get todos failed",
      description: "An unexpected error occurred",
    });
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function addNewTodo(todoText: string) {
  try {
    const responce = await addTodo((profileData as ProfileData).id, todoText);
    if (!responce.ok) {
      notificationWindow({
        type: "error",
        message: "Add todo failed",
        description: "An unexpected error occurred",
      });
      return;
    }

    const newTodo = await responce.json();
    todos.value?.push(newTodo);
    notificationWindow({
      type: "success",
      message: "Add todo success",
      description: "You have successfully added a new todo",
    });
  } catch (error) {
    notificationWindow({
      type: "error",
      message: "Add todo failed",
      description: "An unexpected error occurred",
    });
    console.error(error);
  }
}

async function deleteTodo(todo: Todo) {
  todos.value = todos.value?.filter((item) => item.todo !== todo.todo);
  notificationWindow({
    type: "success",
    message: "Delete todo success",
    description: "You have successfully deleted a todo",
  });
}
</script>
<template>
  <Header />
  <AddTodo @add-todo="addNewTodo" />
  <TodosList
    v-model:todos="todos"
    @delete-todo="deleteTodo"
    :isLoading="isLoading"
  />
</template>
