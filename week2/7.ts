function wait(time: number, value: string): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}

async function main(): Promise<void> {
  const winner = await Promise.race([
    wait(3000, "Slow task"),
    wait(1000, "Fast task"),
    wait(2000, "Medium task"),
  ]);

  console.log("Winner:", winner);
}

main();
