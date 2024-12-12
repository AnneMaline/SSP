import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
};

const isTokenValid = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export { isTokenValid };
