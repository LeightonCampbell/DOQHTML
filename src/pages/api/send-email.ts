export const prerender = false;

import type { APIRoute } from 'astro';
import { handleSubmission, methodNotAllowed } from '../../lib/submissions';

/** Older quote and booking callers post here. Same handler as /api/quote/. */
export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = ({ request, locals }) =>
  handleSubmission('project', request, locals);
