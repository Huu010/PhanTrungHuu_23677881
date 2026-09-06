interface User {
  id: number;
  name: string;
}

function fetchUser(id: number, delayMs: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), delayMs);
  });
}

async function fetchUserWithTimeout(id: number, delayMs: number): Promise<User> {
  const apiPromise = fetchUser(id, delayMs);

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("API call timed out after 2 seconds"));
    }, 2000);
  });

  return Promise.race([apiPromise, timeoutPromise]);
}

fetchUserWithTimeout(1, 2500)
  .then((user) => console.log(user))
  .catch((error: Error) => console.error(error.message));
