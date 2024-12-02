import type { PageLoad } from './$types.js';

import { createComponent } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ data }) => {
	const { componentsMetadata, ...rest } = data;

	const components = await Promise.all(
		componentsMetadata.flatMap((directory) => directory.components).map(createComponent)
	);

	return {
		components,
		...rest
	};
}) satisfies PageLoad;
