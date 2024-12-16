export async function fetchAuth() {
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
