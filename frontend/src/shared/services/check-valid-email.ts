const checkValidEmail = async (email: string) => {
  const resp = await fetch("http://localhost:5000/api/auth/valid-email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (resp.status === 200) {
    return true;
  }

  return false;
};

export default checkValidEmail;
