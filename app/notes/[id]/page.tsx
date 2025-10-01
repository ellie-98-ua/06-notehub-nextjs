import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import NoteClient from "./NoteClient";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNote(params.id),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient noteId={params.id} />
    </HydrationBoundary>
  );
}
