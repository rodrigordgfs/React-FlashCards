export default function Button({ label = "Text", onButtonClick = null }) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      className="bg-gray-200 rounded-md p-2 shadow-md"
      onClick={handleButtonClick}
    >
      {label}
    </button>
  );
}
