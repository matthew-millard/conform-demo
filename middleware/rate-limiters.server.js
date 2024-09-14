import { rateLimit } from 'express-rate-limit';

const rateLimitDefault = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

export const strongRateLimit = rateLimit({
  ...rateLimitDefault,
  limit: 100,
});

export const strongestRateLimit = rateLimit({
  ...rateLimitDefault,
  limit: 10,
});

export const generalRateLimit = rateLimitDefault;
