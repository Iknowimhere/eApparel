export const getToken = (req) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("login to access this route");
  }
  return token;
};
