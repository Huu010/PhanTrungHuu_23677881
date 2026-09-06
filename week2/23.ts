interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchCompletedTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const todos = (await response.json()) as Todo[];
  return todos.filter((todo) => todo.completed);
}

fetchCompletedTodos()
  .then((todos) => console.log(todos))
  .catch(console.error);
