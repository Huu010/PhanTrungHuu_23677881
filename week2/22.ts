interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodo(id: number): Promise<Todo> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for todo ${id}`);
  }

  return (await response.json()) as Todo;
}

async function main(): Promise<void> {
  const ids = [1, 2, 3];
  const results = await Promise.all(ids.map((id) => fetchTodo(id)));

  results.forEach((todo) => console.log(todo));
}

main().catch(console.error);
