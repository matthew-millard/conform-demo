import { z } from 'zod';

export const ThemeSwitcherSchema = z.object({
  theme: z.enum(['light', 'dark']),
});
