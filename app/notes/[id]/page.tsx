"use client";

import { fetchNote } from "../../lib/api";

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await fetchNote(params.id);
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
