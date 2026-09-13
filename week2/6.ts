function simulateTask(time: number, name: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`${name} done`), time);
  });
}

async function main(): Promise<void> {
  const results = await Promise.all([
    simulateTask(1000, "Task 1"),
    simulateTask(2000, "Task 2"),
    simulateTask(1500, "Task 3"),
  ]);

  console.log(results);
}

main();
