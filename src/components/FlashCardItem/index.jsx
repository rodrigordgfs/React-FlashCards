import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";

export default function FlashCardItem({
  flashcard = {},
  onEdit = null,
  onDelete = null,
}) {
  function handleEditFlashcard() {
    if (onEdit) {
      onEdit(id);
    }
  }

  function handleDeleteFlashcard() {
    if (onDelete) {
      onDelete(id);
    }
  }

  const { id, title, description } = flashcard;
  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-2">
        <li>
          <strong>Título:</strong> {title}
        </li>
        <li>
          <strong>Descrição:</strong> {description}
        </li>
      </ul>
      <div className="flex flex-row mt-4 items-center justify-end space-x-4">
        <EditIcon
          onClick={handleEditFlashcard}
          className="cursor-pointer"
          size={24}
        />
        <DeleteIcon
          onClick={handleDeleteFlashcard}
          className="cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
}
