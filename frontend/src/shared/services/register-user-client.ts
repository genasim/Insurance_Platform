const registerUserClient = async (
  email: string,
  password: string,
  fullName: string
) => {
  const resp = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName }),
  });

  const body = await resp.json();
  if (resp.status > 400) {
    throw new Error(body.message);
  }

  return body.token;
};

export default registerUserClient;
