import { CameraIcon } from '@heroicons/react/24/outline';
import { useFetcher } from '@remix-run/react';
import { useRef } from 'react';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '~/schemas/misc';

export const uploadProfileImageActionIntent = 'upload-profile-image';

export default function UploadProfileImageForm() {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formRef.current?.requestSubmit();
  };
  return (
    <fetcher.Form action="/resource" ref={formRef} method="POST" encType="multipart/form-data">
      <input type="hidden" name="intent" value={uploadProfileImageActionIntent} />
      <label htmlFor="profile" className="">
        <div className="text-white border-2 border-white shadow-md rounded-full p-1.5 bg-dodger-blue-500 hover:bg-dodger-blue-400">
          <CameraIcon className="h-5 w-5" />
        </div>
      </label>
      <input
        id="profile"
        type="file"
        name="profile"
        hidden
        capture="user"
        accept={ACCEPTED_IMAGE_TYPES.join(', ')}
        size={MAX_IMAGE_SIZE}
        onChange={handleInputChange}
      />
    </fetcher.Form>
  );
}
