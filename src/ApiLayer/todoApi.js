export default async function fetchTodoList() {
  try {
    const response = await fetch("https://dummyjson.com/todo");
    if (!response.ok) {
      throw new Error("Unable to fetch todo list");
    }
    const data = await response.json();
    return data.todos ? data.todos : [];
  } catch (err) {
    console.error(err);
    throw new Error("Unable to fetch todo list");
  }
}
