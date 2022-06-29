import { useEffect, useState } from "react";
import Button from "../../components/Button";
import FlashCard from "../../components/FlashCard";
import FlashCards from "../../components/FlashCards";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import RadioButton from "../../components/RadioButton";
import FlashCardItem from "../../components/FlashCardItem";
import { helperSuffleArray } from "../../helpers/arrayHelpers";
import {
  getAllFlashcards,
  deleteFlashcard,
  updateFlashcard,
  insertFlashcard,
} from "../../services/apiService";
import { successMessage, errorMessage } from "../../utils/toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FlashCardForm from "../../components/FlashCardForm";
import { getNewId } from "../../services/idService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlashCardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [studyFlashcards, setStudyFlashcards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [createMode, setCreateMode] = useState(true);
  const [selectedTad, setSelectedTab] = useState(0);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  const LISTAGEM = 0;
  const CADASTRO = 1;

  useEffect(() => {
    getAllFlashcards()
      .then(({ data }) => {
        setFlashcards(data);
        setLoading(false);
      })
      .catch(({ message }) => {
        errorMessage(message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setStudyFlashcards(
      flashcards.map((flashcard) => ({ ...flashcard, showTitle: true }))
    );
  }, [flashcards]);

  function handleSuffleCards() {
    setStudyFlashcards(helperSuffleArray(studyFlashcards));
  }

  function handleRadioShowTitleClick() {
    setStudyFlashcards(
      [...studyFlashcards].map((card) => ({
        ...card,
        showTitle: false,
      }))
    );
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowDescriptionClick() {
    setStudyFlashcards(
      [...studyFlashcards].map((card) => ({
        ...card,
        showTitle: true,
      }))
    );
    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashcards(cardId) {
    const updatedCards = [...studyFlashcards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyFlashcards(updatedCards);
  }

  function handleEditFlashCard(flashcardData) {
    setCreateMode(false);
    setSelectedFlashcard(flashcardData);
    setSelectedTab(CADASTRO);
  }

  async function handleDeleteFlashCard(cardId) {
    await deleteFlashcard(cardId)
      .then(() => {
        successMessage("Flashcard deletado com sucesso!");
      })
      .catch(({ message }) => {
        errorMessage(message);
      });
    setFlashcards(flashcards.filter((card) => card.id !== cardId));
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashcard() {
    setCreateMode(true);
    setSelectedFlashcard(null);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      await insertFlashcard({ title, description })
        .then(() => {
          successMessage("Flashcard criado com sucesso!");
        })
        .catch(({ message }) => {
          errorMessage(message);
        });
      setFlashcards([...flashcards, { id: getNewId(), title, description }]);
    } else {
      await updateFlashcard({ id: selectedFlashcard.id, title, description })
        .then(() => {
          successMessage("Flashcard atualizada com sucesso!");
        })
        .catch(({ message }) => {
          errorMessage(message);
        });
      setFlashcards(
        flashcards.map((flashcard) => {
          if (flashcard.id === selectedFlashcard.id) {
            return { ...flashcard, title, description };
          }
          return flashcard;
        })
      );
      setSelectedFlashcard(null);
      setCreateMode(true);
      setSelectedTab(LISTAGEM);
    }
  }

  return (
    <>
      <Header title="React FlashCards V3" />
      {loading ? (
        <div className="flex items-center justify-center m-4">
          <Loading />
        </div>
      ) : (
        <Main>
          <Tabs selectedIndex={selectedTad} onSelect={handleTabSelect}>
            <TabList>
              <Tab>Listagem</Tab>
              <Tab>Cadastro</Tab>
              <Tab>Estudo</Tab>
            </TabList>
            <TabPanel>
              {flashcards.map((flashcard) => {
                return (
                  <FlashCardItem
                    key={flashcard.id}
                    flashcard={flashcard}
                    onEdit={handleEditFlashCard}
                    onDelete={handleDeleteFlashCard}
                  />
                );
              })}
            </TabPanel>
            <TabPanel>
              <div className="my-4">
                <Button
                  onButtonClick={handleNewFlashcard}
                  label="Novo FlashCard"
                />
              </div>
              <FlashCardForm
                createMode={createMode}
                onPersist={handlePersist}
                selectedFlashcard={selectedFlashcard}
              />
            </TabPanel>
            <TabPanel>
              <div className="text-center m-2">
                <Button
                  label="Embaralhar Cards"
                  onButtonClick={handleSuffleCards}
                />
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
                {studyFlashcards.map(
                  ({ id, title, description, showTitle }) => {
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
                  }
                )}
              </FlashCards>
            </TabPanel>
          </Tabs>
        </Main>
      )}
      <ToastContainer />
    </>
  );
}
