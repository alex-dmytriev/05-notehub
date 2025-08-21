import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";

const App = () => {
  const [page] = useState(1); //TODO: add setPage later
  const limit = 10;
  const searchTerm = "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", { page, limit, searchTerm }],
    queryFn: () => fetchNotes(page, limit, searchTerm),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occured: {error.message}</p>}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default App;
