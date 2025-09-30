import NotesClient from "./NotesClient";
import { fetchNotes } from "@/lib/api";

import css from "../../components/Home/Home.module.css";

export default async function NotesPage() {
  const initialData = await fetchNotes({}); 

  return <NotesClient initialData={initialData} />;
}
