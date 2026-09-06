async function task(name: string, time: number): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, time));
  return `${name} done`;
}

async function main(): Promise<void> {
  const results = await Promise.all([
    task("Task 1", 1000),
    task("Task 2", 1000),
    task("Task 3", 1000),
  ]);

  console.log(results);
}

main();
