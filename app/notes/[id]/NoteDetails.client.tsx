"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import { useParams } from "next/navigation";
import Title from "@/components/Title/Title";
import Content from "@/components/Content/Content";
import CreatedAt from "@/components/CreatedAt/CreatedAt";
import css from "./NoteDetails.client.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const noteId = Number(params.id);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <Title text={note.title} />
        </div>
        <Content text={note.content} />
        <CreatedAt date={note.createdAt} />
      </div>
    </div>
  );
}
