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
  search: string,
  page: number
): Promise<fetchNotesProps> => {
  const params = {
    params: {
      page,
      search,
      perPage: 10,
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

export const createNote = async (newTask: newTaskProp): Promise<Note> => {
  const createNoteResponse = await axiosInst.post<Note>("/notes", newTask);
  console.log(createNoteResponse.data);
  return createNoteResponse.data;
};

//* === DELETE === *
export const deleteNote = async (taskID: string): Promise<Note> => {
  const deleteNoteResponse = await axiosInst.delete<Note>(`notes/${taskID}`);
  return deleteNoteResponse.data;
};
