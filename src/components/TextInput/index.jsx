import { getNewId } from "../../services/idService";

export default function TextInput({
  id = getNewId(),
  inputLabel = "Label description",
  inputValue = "",
  inputType = "text",
  inputFocus = false,
  onInputChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      onInputChange(currentTarget.value);
    }
  }

  return (
    <>
      <div className="flex flex-col my-4">
        <label className="text-sm mb-1" htmlFor={id}>
          {inputLabel}
        </label>
        <input
          autoFocus={inputFocus}
          id={id}
          className="border p-1"
          type={inputType}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
