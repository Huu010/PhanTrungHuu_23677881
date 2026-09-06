async function task(id: number): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return `Task ${id} done`;
}

async function queueProcess(taskIds: number[]): Promise<void> {
  for (const id of taskIds) {
    const result = await task(id);
    console.log(result);
  }
}

queueProcess([1, 2, 3, 4, 5]).catch(console.error);
