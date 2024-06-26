const loginUser = async (email: string, password: string) => {
  const resp = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const body = await resp.json();
  if (resp.status >= 400) {
    throw new Error(await body.message);
  }

  return body.token;
};

export default loginUser;
