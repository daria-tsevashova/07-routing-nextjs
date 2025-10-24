"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <Loader />;
  if (error || !note) return <ErrorMessage />;

  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <Modal onClose={() => router.back()}>
      <button
        onClick={() => router.back()}
        className={css.backBtn}
        type="button"
      >
        Go Back
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
}
