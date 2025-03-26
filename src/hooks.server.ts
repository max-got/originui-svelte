import type { Handle } from '@sveltejs/kit';

import { sequence } from '@sveltejs/kit/hooks';
import { RequestClient } from '$data/api/helpers/RequestClient';
import { redirects } from '$lib/server/redirects/config';
import { checkRedirect, createRedirectResponse } from '$lib/server/redirects/handler';

const typedServerFetch: Handle = async ({ event, resolve }) => {
	const { fetch, locals } = event;

	if (!locals.serverClient) {
		locals.serverClient = new RequestClient(fetch);
	}

	return await resolve(event);
};

const handleRedirects: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const redirectResult = checkRedirect(path, redirects);

	if (redirectResult.shouldRedirect && redirectResult.destination) {
		createRedirectResponse(redirectResult.destination);
	}

	return await resolve(event);
};

export const handle: Handle = sequence(typedServerFetch, handleRedirects);
