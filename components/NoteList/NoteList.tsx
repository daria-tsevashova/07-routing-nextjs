"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { useRouter } from "next/navigation";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Мутація видалення нотатки
  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
    },
    onError: (err) => console.error(err),
  });

  const handleDelete = (noteId: string) => mutation.mutate(noteId);

  // Відкриття модалки з нотаткою SPA-подібно
  const openNote = (id: string) => {
    router.push(`/@modal/notes/${id}`, { scroll: false });
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            {/* Кнопка відкриття модалки */}
            <button className={css.link} onClick={() => openNote(note.id)}>
              View details
            </button>

            {/* Кнопка видалення нотатки */}
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
