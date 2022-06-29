import { getNewId } from "../../services/idService";

export default function TextArea({
  id = getNewId(),
  inputLabel = "Label description",
  inputValue = "",
  inputType = "text",
  inputFocus = false,
  onTextAreaChange = null,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      onTextAreaChange(currentTarget.value);
    }
  }

  const currentCharacterCount = inputValue.length;

  return (
    <>
      <div className="flex flex-col my-4">
        <label className="text-sm mb-1" htmlFor={id}>
          {inputLabel}
        </label>
        <textarea
          autoFocus={inputFocus}
          id={id}
          className="border p-1"
          type={inputType}
          value={inputValue}
          onChange={handleTextAreaChange}
          maxLength={maxLength}
          rows={rows}
        />
        <div className="flex justify-end pt-1">
          <span>
            {currentCharacterCount} / {maxLength}
          </span>
        </div>
      </div>
    </>
  );
}
