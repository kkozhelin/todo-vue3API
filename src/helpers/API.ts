import { FormState } from "@/types/profileData";

export async function signIn(formState: FormState) {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formState, expiresInMins: 120 }),
  });
  return response;
}

export async function loginVerification() {
  const response = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTodo")}`,
    },
  });
  return response;
}

export async function getAllTodos(idUser: number) {
  const response = await fetch(`https://dummyjson.com/todos/user/${idUser}`);
  return response;
}

export async function deleteTodo(idTodo: number) {
  const response = await fetch(`https://dummyjson.com/todos/${idTodo}`, {
    method: "DELETE",
  });
  return response;
}

export async function addTodo(userId: number, todo: string) {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo,
      completed: false,
      userId,
    }),
  });
  return response;
}

export async function changeTodo(idTodo: number, completed: boolean) {
  const response = await fetch(`https://dummyjson.com/todos/${idTodo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return response;
}
