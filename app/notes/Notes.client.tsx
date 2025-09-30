"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  if (debouncedSearch && page !== 1) setPage(1);

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    initialData,
  });

  const notes = data.notes;
  const totalPages = data.totalPages;

  return (
    <div className={css.container}>
      <SearchBox value={search} onChange={setSearch} />
      <button onClick={() => setIsModalOpen(true)}>Create note +</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      <NoteList notes={notes} />
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
