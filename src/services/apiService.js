import { find, remove, update, insert } from "./axiosService";
import { getNewId } from "./idService";

export async function getAllFlashcards() {
  return await find("/flashcards");
}

export async function deleteFlashcard(id) {
  return await remove(`/flashcards/${id}`);
}

export async function updateFlashcard(data) {
  const { id, title, description } = data;
  return await update(`/flashcards/${id}`, { title, description });
}

export async function insertFlashcard(data) {
  return await insert("/flashcards", { ...data, id: getNewId() });
}
