const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

promise.then((message) => {
  console.log(message);
});
