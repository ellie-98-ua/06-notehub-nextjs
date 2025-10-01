"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearch && page !== 1) {
      setPage(1);
    }
  }, [debouncedSearch, page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page, perPage: 12, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.container}>
      {/* Search */}
      <SearchBox value={search} onChange={setSearch} />

      {/* Notes list */}
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className={css.item}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      ) : (
        <p>No notes found</p>
      )}

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className={css.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}

      {/* Модалка */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <NoteForm onClose={() => setModalOpen(false)} />
      </Modal>

      {/* Кнопка відкриття модалки */}
      <button className={css.openModalBtn} onClick={() => setModalOpen(true)}>
        Add Note
      </button>
    </div>
  );
}