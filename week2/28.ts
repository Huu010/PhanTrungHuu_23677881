async function task(id: number): Promise<string> {
  const time = 500 + Math.floor(Math.random() * 1500);
  await new Promise((resolve) => setTimeout(resolve, time));
  return `Task ${id} done in ${time}ms`;
}

async function batchProcess(): Promise<void> {
  const tasks = [1, 2, 3, 4, 5].map((id) => task(id));
  const results = await Promise.all(tasks);

  console.log(results);
}

batchProcess().catch(console.error);
