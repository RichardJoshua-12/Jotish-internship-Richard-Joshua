import { API_BASE_URL } from "../config";
export const PostMethod = async (payload) => {

  try {

    const response = await fetch(
      API_BASE_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("API Fetch Error:", error);
    return null;

  }
};