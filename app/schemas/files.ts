import { z } from 'zod';

export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
export const ACCEPTED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'];
export const FileSchema = z.object({
  document: z.instanceof(File),
});
