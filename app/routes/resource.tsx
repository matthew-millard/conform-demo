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
  let uploadFileContentType: string | undefined = undefined;
  let uploadDocumentPublicId: string | undefined = undefined;
  const uploadHandler: UploadHandler = composeUploadHandler(async ({ name, data, filename, contentType }) => {
    if (name !== 'document' || !filename) {
      return undefined;
    }

    uploadFileContentType = contentType;

    const folderPath = `users/${userId}/documents`;
    const uploadedDocument = await uploadDocument(data, folderPath);
    uploadDocumentPublicId = uploadedDocument.public_id;
    return uploadedDocument.secure_url;
  }, createMemoryUploadHandler());

  const formData = await parseMultipartFormData(request, uploadHandler);

  const url = formData.get('document') as string;
  const fileName = formData.get('fileName') as string;

  if (!uploadFileContentType) {
    return json({ success: false, error: 'Invalid file type' }, { status: 400 });
  } else if (!uploadDocumentPublicId) {
    return json({ success: false, error: 'Failed to upload document' }, { status: 500 });
  }

  // Save the document URL to the database
  const documentRecord = await prisma.document.upsert({
    where: { url },
    create: {
      fileName,
      url,
      publicId: uploadDocumentPublicId,
      contentType: uploadFileContentType,
      user: { connect: { id: userId } },
    },
    update: {
      fileName,
      url,
      publicId: uploadDocumentPublicId,
      contentType: uploadFileContentType,
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
