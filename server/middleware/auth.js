import jwt from "jsonwebtoken";

export const verifyWebToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {  // we want the token to start with bearer
      token = token.slice(7, token.length).trimLeft(); // we will take everything fro the right side of thie bearer
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
   
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};