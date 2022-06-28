export default function FlashCard({
  id = null,
  title = "Title",
  description = "Description",
  showFlashcardTitle = true,
  onToggleFlashcards = null,
}) {
  const fontSizeClass = showFlashcardTitle ? "text-xl" : "text-sm";

  function handleCardClick() {
    if (onToggleFlashcards) {
      onToggleFlashcards(id);
    }
  }

  return (
    <div
      className={`cursor-pointer shadow-lg p-4 m-2 w-80 h-48 flex flex-row items-center justify-center font-mono font-semibold ${fontSizeClass}`}
      onClick={() => handleCardClick()}
    >
      {showFlashcardTitle ? title : description}
    </div>
  );
}
