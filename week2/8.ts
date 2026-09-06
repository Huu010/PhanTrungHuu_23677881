Promise.resolve(2)
  .then((value) => value * value) // 2^2 = 4
  .then((value) => value * 2)     // 4 * 2 = 8
  .then((value) => value + 5)     // 8 + 5 = 13
  .then((result) => {
    console.log("Result:", result);
  });
