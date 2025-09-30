import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const initialData = await fetchNotes({}); 

  return <NotesClient initialData={initialData} />;
}
