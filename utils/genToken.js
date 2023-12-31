import jwt from "jsonwebtoken";
export const genToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
};

export default genToken;
