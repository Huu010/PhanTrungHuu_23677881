interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function main(): Promise<void> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const todo = (await response.json()) as Todo;
  console.log(todo);
}

main().catch((error: unknown) => {
  console.error(error);
});
