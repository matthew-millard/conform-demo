import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { requireUser } from '~/.server/auth';
import { prisma } from '~/.server/db';
import { invariantResponse } from '~/utils/misc';
import cloudinary, { DeleteApiResponse } from 'cloudinary';

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const documentId = formData.get('documentId');

  invariantResponse(documentId === params.documentId, 'Invalid document ID', {
    status: 400,
    statusText: 'Bad Request',
  });

  const deletedRecord = await prisma.document.delete({
    where: { id: documentId, userId: user.id },
  });

  // Delete the document from Cloudinary
  await cloudinary.v2.api.delete_resources([deletedRecord.publicId], {
    resource_type: 'raw',
  });

  if (!deletedRecord) {
    throw new Response('Document not found', { status: 404 });
  }

  return json({ deletedRecord, success: true, error: null });
}

export async function loader({ params }: LoaderFunctionArgs) {
  const documentId = params.documentId;
  const documentRecord = await prisma.document.findFirst({
    where: { id: documentId },
  });

  if (!documentRecord) {
    throw new Response('Not Found', { status: 404 });
  }

  try {
    const response = await fetch(documentRecord.url);

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    const fileBuffer = await response.arrayBuffer();
    const file = Buffer.from(fileBuffer);

    return new Response(file, {
      headers: {
        'Content-Type': documentRecord.contentType,
        'Content-Disposition': `attachment; filename="${documentRecord.fileName}"`,
      },
    });
  } catch (error) {
    console.error('error', error);
    throw new Response('Internal Server Error', { status: 500 });
  }
}
