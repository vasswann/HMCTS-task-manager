import { Request, Response, NextFunction } from 'express';
import type { HttpLogger } from 'pino-http';
import { logger } from '../lib/logger';
import { API_ErrorResponse } from '../interfaces/http';

type RequestWithOptionalLog = Request & {
  log?: HttpLogger['logger'];
};

export function errorHandler(
  err: unknown,
  req: RequestWithOptionalLog,
  res: Response<API_ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (req.log && typeof req.log.error === 'function') {
    req.log.error({ err }, '[GlobalErrorHandler] Unhandled error');
  } else {
    logger.error({ err }, '[GlobalErrorHandler] Unhandled error');
  }

  res.status(500).json({
    errors: [
      {
        code: 'INTERNAL_SERVER_ERROR',
        title: 'Internal server error',
        detail: 'An unexpected error occurred. Please try again later.',
      },
    ],
  });
}
