"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";

interface NoteClientProps {
  noteId: string;
}

export default function NoteClient({ noteId }: NoteClientProps) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (error || !note) return <p>Something went wrong</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}