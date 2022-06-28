import { get } from "./axiosService";

const BASE_URL = "http://localhost:3001/flashcards";

export async function getAllFlashcards() {
  return await get(BASE_URL);
}
