"use client";

import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  note: Note;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className={css.container}>
      <h2>{note.title}</h2>
      <span>{note.tag}</span>
      <p>{note.content}</p>
      <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
    </div>
  );
}
