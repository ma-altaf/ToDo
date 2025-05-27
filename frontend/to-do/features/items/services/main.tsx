import { TToDoItem } from "./types";

const TODO_URL = process.env.NEXT_PUBLIC_URL + "/api/Todo";

export async function addItem(
  newItem: Pick<TToDoItem, "title" | "description">
): Promise<TToDoItem> {
  if (newItem.title.trim().length == 0)
    return Promise.reject(new Error("Title is required."));

  const promise = await fetch(TODO_URL + "/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (promise.status >= 400) return Promise.reject(await promise.json());

  return promise.json();
}

export async function getItems(): Promise<TToDoItem[]> {
  return (await fetch(TODO_URL)).json();
}

export async function getItemById(id: number): Promise<TToDoItem> {
  return (await fetch(`${TODO_URL}/${id}`)).json();
}

export async function updateItemById(
  id: number,
  updatedItem: Pick<TToDoItem, "title" | "description">
) {
  return await fetch(`${TODO_URL}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  })
    .then(async (res) => {
      console.log("success");

      console.log(await res.json());
    })
    .catch((e) => {
      console.log("failed");
      console.log(e);
    });
}

export async function deleteItemById(id: number) {
  return (
    await fetch(`${TODO_URL}/${id}`, {
      method: "DELETE",
    })
  ).json();
}
