import axios from "axios";
import type { AxiosResponse } from "axios";
import type { CreateNoteData, Note } from "../types/note";

interface CreateNoteResponse {
  note: Note;
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface DeleteNoteResponse {
  note: Note;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const createNote = async (
  noteData: CreateNoteData
): Promise<CreateNoteResponse> => {
  const response: AxiosResponse<CreateNoteResponse> = await apiClient.post(
    "/notes",
    noteData
  );
  return response.data;
};

const fetchNotes = async (
  search?: string,
  page?: number,
  perPage?: number
): Promise<FetchNotesResponse> => {
  const response = await apiClient.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage },
  });
  return response.data;
};

const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response: AxiosResponse<DeleteNoteResponse> = await apiClient.delete(
    `/notes/${id}`
  );
  return response.data;
};

export { createNote, fetchNotes, deleteNote };

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await apiClient.get<Note>(`/notes/${noteId}`);
  return response.data;
};
