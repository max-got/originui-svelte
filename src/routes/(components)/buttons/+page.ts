import type { PageLoad } from './$types.js';

import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ parent }) => {
	const { componentMetadata } = await parent();

	const components = await Promise.all(
		componentMetadata.map((component) => createComponentRender(component))
	);

	return { components };
}) satisfies PageLoad;
