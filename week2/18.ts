interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    name: `User ${id}`,
  };
}

fetchUser(101).then((user) => {
  console.log(user);
});
