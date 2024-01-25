import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (
  payload: Object,
  key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions = {}
) => {
  let privateKey: any;
  let accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  let refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  if (key === "accessTokenPrivateKey") {
    privateKey = Buffer.from(accessTokenPrivateKey, "base64").toString("ascii");
  } else if (key === "refreshTokenPrivateKey") {
    privateKey = Buffer.from(refreshTokenPrivateKey, "base64").toString(
      "ascii"
    );
  }
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token: string,
  key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  let accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;
  let refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;
  try {
    let publicKey: any;
    if (key === "accessTokenPublicKey") {
      publicKey = Buffer.from(accessTokenPublicKey, "base64").toString("ascii");
    } else if (key === "refreshTokenPublicKey") {
      publicKey = Buffer.from(refreshTokenPublicKey, "base64").toString(
        "ascii"
      );
    }
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
