function wait(time: number, value: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}

async function main(): Promise<void> {
  const promises: Promise<number>[] = [
    wait(1000, 10),
    wait(500, 20),
    wait(200, 30),
  ];

  for await (const value of promises) {
    console.log("Value:", value);
  }
}

main();
