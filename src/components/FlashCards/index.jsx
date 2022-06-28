export default function FlashCards({ children: flashcards }) {
  return (
    <div className="border p-2 flex flex-wrap flex-row items-center justify-center">
      {flashcards}
    </div>
  );
}
