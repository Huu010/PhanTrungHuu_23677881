function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function multiplyByThree(number: number): Promise<number> {
  await delay(1000);
  return number * 3;
}

multiplyByThree(7).then((result) => console.log(result)); // 21
