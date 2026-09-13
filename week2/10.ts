function doWork(shouldFail: boolean): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Work failed"));
      } else {
        resolve("Work successful");
      }
    }, 1000);
  });
}

doWork(false)
  .then((result) => console.log(result))
  .catch((error: Error) => console.error(error.message))
  .finally(() => console.log("Done"));
