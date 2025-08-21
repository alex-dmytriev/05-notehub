import axios from "axios";
import { type Note, type NoteTag } from "../types/note";

const axiosInst = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

//* === GET === *
interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  searchTerm: string
): Promise<fetchNotesProps> => {
  const params = {
    params: {
      page: page,
      perPage: perPage,
      search: searchTerm,
    },
  };

  const fetchNotesResponse = await axiosInst.get<fetchNotesProps>(
    "/notes",
    params
  );

  return fetchNotesResponse.data;
};

//* === CREATE === *
interface newTaskProp {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newTask: newTaskProp) => {
  const createNoteResponse = await axiosInst.post("/notes", newTask);
  return createNoteResponse.data;
};

//* === DELETE === *
export const deleteNote = async (taskID: string): Promise<Note> => {
  const deleteNoteResponse = await axiosInst.delete(`notes/${taskID}`);
  return deleteNoteResponse.data;
};
