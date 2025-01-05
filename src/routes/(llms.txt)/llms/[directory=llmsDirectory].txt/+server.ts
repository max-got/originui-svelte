import type { RequestEvent, RequestHandler } from './$types';

import { API_V1_LLMS_ENDPOINT_HANDLER } from '$data/api/llms.handler';

export const prerender = true;

export const entries = API_V1_LLMS_ENDPOINT_HANDLER.entries;

export const fallback = API_V1_LLMS_ENDPOINT_HANDLER.fallback;

export const GET = (async ({ fetch, ...rest }: RequestEvent) => {
	const handler = await API_V1_LLMS_ENDPOINT_HANDLER.GET(fetch);
	return handler(rest);
}) satisfies RequestHandler;
