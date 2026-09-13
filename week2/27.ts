async function fetchWithRetry(url: string, retries: number): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error: unknown) {
      lastError = error;

      if (attempt === retries) {
        throw lastError;
      }

      console.log(`Attempt ${attempt + 1} failed. Retrying...`);
    }
  }

  throw new Error("Unreachable");
}

async function main(): Promise<void> {
  const response = await fetchWithRetry(
    "https://jsonplaceholder.typicode.com/todos/1",
    3
  );

  console.log(await response.json());
}

main().catch(console.error);
