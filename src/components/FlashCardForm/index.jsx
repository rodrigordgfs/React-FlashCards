import TextInput from "../TextInput";
import TextArea from "../TextArea";
import { useEffect, useState } from "react";
import Button from "../Button";
import { warningMessage } from "../../utils/toast";

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  selectedFlashcard = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedFlashcard) {
      setTitle(selectedFlashcard.title);
      setDescription(selectedFlashcard.description);
    }
  }, [selectedFlashcard]);

  useEffect(() => {
    if (createMode) {
      setTitle("");
      setDescription("");
    }
  }, [createMode]);

  function handleInputTitleChange(value) {
    setTitle(value);
  }

  function handleInputDescriptionChange(value) {
    setDescription(value);
  }

  function clearFields() {
    setTitle("");
    setDescription("");
  }

  function validateForm() {
    if (title.trim !== "") {
      warningMessage("Preencha o campo título");
      return false;
    } else if (description.trim !== "") {
      warningMessage("Preencha o campo descrição");
      return false;
    }
    return true;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      setError("");
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError("Preencha todos os campos");
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <form className="p-4" onSubmit={handleFormSubmit} onReset={handleFormReset}>
      <h2 className="font-semibold text-center">Manutenção de Flashcards</h2>
      <TextInput
        inputLabel="Título"
        autofocus
        inputValue={title}
        onInputChange={handleInputTitleChange}
      />
      <TextArea
        inputLabel="Descrição"
        inputValue={description}
        onTextAreaChange={handleInputDescriptionChange}
      />
      <div className="flex items-center justify-between">
        <span>{error}</span>
        <div className="flex items-center space-x-2">
          <Button label="Salvar" color="bg-green-400" type="submit" />
          <Button label="Limpar" color="bg-red-400" type="reset" />
        </div>
      </div>
    </form>
  );
}
