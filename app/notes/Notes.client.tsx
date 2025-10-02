"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query"; // ✅ додали keepPreviousData
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";

import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page, perPage, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    staleTime: 1000 * 60,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.addButton} onClick={openModal}>
          Create note +
        </button>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    </div>
  );
}