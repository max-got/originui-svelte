import type { PageLoad } from './$types.js';

import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const prerender = true;

export const load = (async ({ data }) => {
	const { componentMetadata } = data;

	const components = await Promise.all(
		componentMetadata.map((component) => createComponentRender(component))
	);

	return { components };
}) satisfies PageLoad;
