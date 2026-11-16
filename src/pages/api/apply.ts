export const prerender = false;

import type { APIRoute } from 'astro';
import { handleSubmission, methodNotAllowed } from '../../lib/submissions';

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = ({ request, locals }) =>
  handleSubmission('pro', request, locals);
