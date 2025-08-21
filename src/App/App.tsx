import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

const App = () => {
  //* === States ===
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //? Temp block
  const perPage = 10; //TODO: receive this externally later
  const searchTerm = ""; //TODO: receve this externally later

  //* === Hooks ===
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", { page, perPage, searchTerm }],
    queryFn: () => fetchNotes(page, perPage, searchTerm),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    console.log(isModalOpen); //Todo: any logic here?
  }, [isModalOpen]);

  //* === Handlers ===
  const handleCreateNote = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */} //TODO: Add SearchBox component here
        {data && data?.totalPages > 0 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            setCurrentPage={setPage}
          />
        )}
        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occured: {error.message}</p>}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
