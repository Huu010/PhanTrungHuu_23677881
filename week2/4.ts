function getRandomNumber(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const value = Math.random();

    if (value < 0.9) {
      resolve(value);
    } else {
      reject(new Error("Random operation failed"));
    }
  });
}

getRandomNumber()
  .then((value) => {
    console.log("Random number:", value);
  })
  .catch((error: Error) => {
    console.error("Error:", error.message);
  });
