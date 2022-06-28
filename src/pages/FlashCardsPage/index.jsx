import { useState } from "react";
import Button from "../../components/Button";
import FlashCard from "../../components/FlashCard";
import FlashCards from "../../components/FlashCards";
import Header from "../../components/Header";
import Main from "../../components/Main";
import RadioButton from "../../components/RadioButton";
import { flashcards as allFlashcards } from "../../data/flashcards";
import { helperSuffleArray } from "../../helpers/arrayHelpers";

export default function FlashCardsPage() {
  const [flashcards, setFlashcards] = useState(allFlashcards);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  function handleButtonClick() {
    setFlashcards(helperSuffleArray(flashcards));
  }

  function handleRadioShowTitleClick() {
    setFlashcards(
      [...flashcards].map((card) => ({
        ...card,
        showTitle: false,
      }))
    );
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowDescriptionClick() {
    setFlashcards(
      [...flashcards].map((card) => ({
        ...card,
        showTitle: true,
      }))
    );
    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashcards(cardId) {
    const updatedCards = [...flashcards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setFlashcards(updatedCards);
  }

  return (
    <>
      <Header title="React FlashCards V1" />
      <Main>
        <div className="text-center m-2">
          <Button label="Embaralhar Cards" onButtonClick={handleButtonClick} />
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Monstrar título
          </RadioButton>

          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Monstrar descrição
          </RadioButton>
        </div>
        <FlashCards>
          {flashcards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashcardTitle={showTitle}
                onToggleFlashcards={handleToggleFlashcards}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
