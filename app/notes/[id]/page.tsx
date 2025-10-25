import Modal from "@/components/Modal/Modal";
import NoteDetails from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const note: Note = await fetchNoteById(params.id);

  return (
    <Modal onClose={() => history.back()}>
      <NoteDetails note={note} />
    </Modal>
  );
}
