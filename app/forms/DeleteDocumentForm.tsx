import { TrashIcon } from '@heroicons/react/24/outline';
import { useFetcher } from '@remix-run/react';

export default function DeleteDocumentForm({ documentId }: { documentId: string }) {
  const fetcher = useFetcher({ key: documentId });

  return (
    <fetcher.Form action={`/resource/${documentId}`} method="POST">
      <input type="hidden" name="documentId" value={documentId} readOnly />
      <button type="submit">
        <TrashIcon className="h-5 w-5 flex-shrink-0 text-zinc-400 hover:text-zinc-500 active:text-zinc-600 mr-2" />
      </button>
    </fetcher.Form>
  );
}
