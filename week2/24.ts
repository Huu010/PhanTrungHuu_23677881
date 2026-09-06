interface NewPost {
  title: string;
  body: string;
  userId: number;
}

async function postData(): Promise<void> {
  const data: NewPost = {
    title: "Hello",
    body: "This is a test post",
    userId: 1,
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();
  console.log("Server response:", result);
}

postData().catch(console.error);
