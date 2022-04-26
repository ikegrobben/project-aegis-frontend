export function getToken() {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  };
}
