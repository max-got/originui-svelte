import type { PageLoad } from './$types.js';

import { createComponent } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ data }) => {
	const { componentMetadata, ...rest } = data;

	const component = await createComponent(componentMetadata);

	return {
		component,
		...rest
	};
}) satisfies PageLoad;
