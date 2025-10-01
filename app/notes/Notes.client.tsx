"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page: 1, perPage: 12, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: debouncedSearch }),
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.container}>
      {/* Search + Add button */}
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button
          className={css.addButton}
          onClick={() => setModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {/* Notes list */}
      <NoteList notes={data?.notes || []} />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <NoteForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
