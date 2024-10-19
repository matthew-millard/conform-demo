import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { useFetcher } from '@remix-run/react';
import { ChangeEvent, useState } from 'react';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '~/schemas/files';
import PendingIndicator from './PendingIndicator';
import { z } from 'zod';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

export const downloadFileActionIntent = 'download';
export const uploadFileActionIntent = 'upload';
export const documentField = 'document';

export default function FileAttachmentForm() {
  const [fileName, setFileName] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [formMethod, setFormMethod] = useState<'POST' | 'GET' | undefined>(() => {
    // If the a file exists in the database, the form should be set to 'GET' to download the file
    return 'POST';
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setShowSubmitButton(true);
      setFormMethod('POST');
    }
  };

  const fetcher = useFetcher();
  const isFileUploadPending =
    fetcher.state !== 'idle' &&
    fetcher.formAction === '/resource' &&
    fetcher.formMethod === 'POST' &&
    fetcher.formData?.get('intent') === uploadFileActionIntent;

  const [form, fields] = useForm({
    id: 'file-attachment',
    constraint: getZodConstraint(z.object({ document: z.instanceof(File) })),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: z.object({ document: z.instanceof(File) }) });
    },
  });

  return (
    <li className="flex items-center justify-between py-2 pl-4 pr-6 text-sm">
      <fetcher.Form
        {...getFormProps(form)}
        encType="multipart/form-data"
        method={formMethod}
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
          accept={ACCEPTED_FILE_TYPES.join(',')}
          size={MAX_FILE_SIZE} // 1MB
        />
        <div className="ml-4 flex-shrink-0 flex">
          {!fileName ? null : showSubmitButton && fileName ? (
            <button
              type="submit"
              name="intent"
              value={uploadFileActionIntent}
              className="font-medium text-primary hover:text-primary-variant"
            >
              {isFileUploadPending ? <PendingIndicator color="text-dodger-blue-400" /> : 'Upload'}
            </button>
          ) : (
            <button
              type="submit"
              name="intent"
              value={downloadFileActionIntent}
              className="font-medium text-primary hover:text-primary-variant"
            >
              Download
            </button>
          )}
        </div>
      </fetcher.Form>
    </li>
  );
}

function PaperClip({ id }: { id: string }) {
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
