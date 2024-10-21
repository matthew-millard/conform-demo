import { LoaderFunctionArgs } from '@remix-run/node';
import { prisma } from '~/.server/db';

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
