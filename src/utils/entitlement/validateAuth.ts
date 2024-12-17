import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
};

// Fetch auth and add in local storage
async function fetchAuth() {
  try {
    const response = await fetch("/api/auth-API/");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // TASK: hash access_token before adding to local storage. Save hash-secret in env
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// checks if the auth token is valid
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

// validate auth token, if not valid fetch new token
export async function validateAuth() {
  let authToken = localStorage.getItem("access_token");
  if (!authToken || !isTokenValid(authToken)) {
    authToken = await fetchAuth();
  }
  if (!authToken) {
    console.error("No token available for getMembers");
    return;
  }
  return authToken;
}
