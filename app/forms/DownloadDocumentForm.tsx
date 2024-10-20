import { useFetcher } from '@remix-run/react';

export default function DownloadDocumentForm() {
  const fetcher = useFetcher();
  return <fetcher.Form action="/resource" method="GET"></fetcher.Form>;
}
