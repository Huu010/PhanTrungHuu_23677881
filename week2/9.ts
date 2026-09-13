function getEvenNumbers(numbers: number[]): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evenNumbers = numbers.filter((n) => n % 2 === 0);
      resolve(evenNumbers);
    }, 1000);
  });
}

getEvenNumbers([1, 2, 3, 4, 5, 6])
  .then((result) => console.log(result)); // [2, 4, 6]
