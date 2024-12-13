import { fetchAuth } from "./getAuth";
import { isTokenValid } from "./isTokenValid";

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
