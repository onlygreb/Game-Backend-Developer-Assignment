import { RequestHandler } from 'express';

export default function wrapAsync(fn: RequestHandler): RequestHandler {
  return (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}