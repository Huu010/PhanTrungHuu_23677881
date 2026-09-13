function getNumber(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

getNumber().then((value) => {
  console.log(value); // 10
});
