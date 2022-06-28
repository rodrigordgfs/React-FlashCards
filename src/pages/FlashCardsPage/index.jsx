import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Error from "../../components/Error";
import FlashCard from "../../components/FlashCard";
import FlashCards from "../../components/FlashCards";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Main from "../../components/Main";
import RadioButton from "../../components/RadioButton";
import FlashCardItem from "../../components/FlashCardItem";
import { helperSuffleArray } from "../../helpers/arrayHelpers";
import { getAllFlashcards } from "../../services/apiService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function FlashCardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [studyFlashcards, setStudyFlashcards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllFlashcards()
      .then(({ data }) => {
        setFlashcards(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
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

  function handleEditFlashCard(cardId) {}

  function handleDeleteFlashCard(cardId) {}

  return (
    <>
      <Header title="React FlashCards V2" />
      {loading ? (
        <div className="flex items-center justify-center m-4">
          <Loading />
        </div>
      ) : (
        <Main>
          {error ? (
            <div>
              <Error
                title="Ops! Algo de errado aconteceu"
                description={error.message}
              />
            </div>
          ) : (
            <>
              <Tabs>
                <TabList>
                  <Tab>Listagem</Tab>
                  <Tab>Cadastro</Tab>
                  <Tab>Estudo</Tab>
                </TabList>
                <TabPanel>
                  {flashcards.map((flashcard) => {
                    return (
                      <FlashCardItem
                        key={flashcard.key}
                        flashcard={flashcard}
                        onEdit={handleEditFlashCard}
                        onDelete={handleDeleteFlashCard}
                      />
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  <h2>Any content 3</h2>
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
            </>
          )}
        </Main>
      )}
    </>
  );
}
