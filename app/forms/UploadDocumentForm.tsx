import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { useFetcher } from '@remix-run/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ACCEPTED_DOCUMENT_TYPES, MAX_FILE_SIZE, UploadDocumentSchema } from '~/schemas';
import PendingIndicator from '../components/PendingIndicator';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { action } from '~/routes/resource';
import { z } from 'zod';

export const uploadFileActionIntent = 'upload';

export default function UploadDocumentForm() {
  const [fileName, setFileName] = useState('');
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.data && fetcher.data.success) {
      formRef.current?.reset();
      setFileName('');
    }
  }, [fetcher.data]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const isFileUploadPending =
    fetcher.state !== 'idle' &&
    fetcher.formAction === '/resource' &&
    fetcher.formMethod === 'POST' &&
    fetcher.formData?.get('intent') === uploadFileActionIntent;

  const [form, fields] = useForm({
    id: 'file-attachment',
    constraint: getZodConstraint(z.object({ document: UploadDocumentSchema })),
    shouldRevalidate: 'onInput',

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.object({ document: UploadDocumentSchema }),
      });
    },
  });

  return (
    <li className="flex items-center justify-between py-2 pl-4 pr-6 text-sm">
      <fetcher.Form
        {...getFormProps(form)}
        ref={formRef}
        encType="multipart/form-data"
        method="POST"
        action="/resource"
        className="flex w-0 flex-1 items-center h-6"
      >
        <PaperClip id={fields.document.id} />
        <span className="ml-2  w-0 flex-1 truncate text-zinc-500">{fileName || 'No file chosen'}</span>
        <input type="hidden" name="fileName" value={fileName} />
        <input
          {...getInputProps(fields.document, { type: 'file' })}
          onChange={handleFileChange}
          className="sr-only"
          size={MAX_FILE_SIZE} // 1MB
          accept={ACCEPTED_DOCUMENT_TYPES.join(', ')}
        />
        <p className="text-sm text-error">{fields.document.errors}</p>
        <p className="text-sm text-error">{fetcher.data?.error ? fetcher.data.error : null}</p>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="submit"
            name="intent"
            value={uploadFileActionIntent}
            className="font-medium text-primary hover:text-primary-variant disabled:text-dodger-blue-800 disabled:cursor-not-allowed"
          >
            {isFileUploadPending ? <PendingIndicator color="text-dodger-blue-400" /> : 'Upload'}
          </button>
        </div>
      </fetcher.Form>
    </li>
  );
}

export function PaperClip({ id }: { id: string }) {
  return (
    <label htmlFor={id}>
      <svg
        className="h-5 w-5 flex-shrink-0 text-zinc-400 hover:text-zinc-500 active:text-zinc-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path
          fillRule="evenodd"
          d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
          clipRule="evenodd"
        ></path>
      </svg>
    </label>
  );
}
