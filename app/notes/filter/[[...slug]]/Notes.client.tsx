"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Toaster } from "react-hot-toast";
import css from "./page.module.css";

interface NotesClientProps {
  initialTag?: string; // початковий тег
}

const NotesClient = ({ initialTag = "" }: NotesClientProps) => {
  const [query, setQuery] = useState(initialTag); // початковий тег у полі пошуку
  const [debounceTerm] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["notes", debounceTerm, currentPage],
    queryFn: () => fetchNotes(debounceTerm, currentPage, 12),
  });

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1); // скидаємо сторінку при зміні пошуку
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} value={query} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data.totalPages}
          />
        )}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
