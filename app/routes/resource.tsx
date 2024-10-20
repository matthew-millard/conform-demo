import type { ActionFunctionArgs, UploadHandler } from '@remix-run/node';
import {
  unstable_parseMultipartFormData as parseMultipartFormData,
  unstable_composeUploadHandlers as composeUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
} from '@remix-run/node';
import { requireUser } from '~/.server/auth';
import { uploadDocument } from '~/.server/cloudinary';
import { prisma } from '~/.server/db';
import { setToastCookie, toastSessionStorage } from '~/.server/toast';
import { uploadFileActionIntent } from '~/forms/UploadDocumentForm';
import { MAX_FILE_SIZE } from '~/schemas';

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const userId = user.id;
  const clonedRequest = request.clone(); // Cloned the request to parse the form data and get the intent and file name
  const formData = await clonedRequest.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case uploadFileActionIntent: {
      // Handle file upload
      return uploadFileAction(request, userId);
    }
    default: {
      throw new Error('Invalid intent');
    }
  }
}

export async function loader() {
  return {};
}

async function uploadFileAction(request: Request, userId: string) {
  const uploadHandler: UploadHandler = composeUploadHandler(async ({ name, data }) => {
    if (name !== 'document') {
      return undefined;
    }

    const folderPath = `users/${userId}/documents`;
    const uploadedDocument = await uploadDocument(data, folderPath);
    return uploadedDocument.secure_url;
  }, createMemoryUploadHandler());

  const formData = await parseMultipartFormData(request, uploadHandler);

  const url = formData.get('document') as string;
  const fileName = formData.get('fileName') as string;

  // Save the document URL to the database
  const documentRecord = await prisma.document.create({
    data: {
      fileName,
      url,
      user: { connect: { id: userId } },
    },
  });

  if (!documentRecord) {
    return json({ success: false, error: 'Unexpected error occurred' }, { status: 500 });
  }

  const toastCookieSession = await setToastCookie(request, {
    id: crypto.randomUUID(),
    type: 'success',
    description: 'Your document has been uploaded successfully.',
    title: `${fileName} uploaded`,
  });

  return json(
    { documentRecord, success: true, error: null },
    {
      status: 201,
      headers: { 'set-cookie': await toastSessionStorage.commitSession(toastCookieSession) },
    }
  );
}
