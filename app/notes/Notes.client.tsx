"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/NoteForm/NoteForm";
import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    placeholderData: { notes: [], totalPages: 1 }, 
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.container}>
      <SearchBox value={search} onChange={setSearch} />
      <button onClick={() => setIsModalOpen(true)}>Create note +</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      <NoteList notes={notes} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
