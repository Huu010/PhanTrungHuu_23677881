function failTask(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

async function main(): Promise<void> {
  try {
    await failTask();
    console.log("This line will not run");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Caught:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

main();
