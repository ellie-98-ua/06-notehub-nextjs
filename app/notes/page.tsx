import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, perPage: 12, search: "" }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
