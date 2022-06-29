export default function Button({
  label = "Text",
  onButtonClick = null,
  color = "bg-gray-200",
  type = "button",
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      className={`${color} rounded-md p-2 shadow-md`}
      onClick={handleButtonClick}
      type={type}
    >
      {label}
    </button>
  );
}
