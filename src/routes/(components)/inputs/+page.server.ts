import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch }) => {
	const componentMetadataInput = await fetchComponentsFromAPI(fetch, 'inputs');
	const componentMetadataTextarea = await fetchComponentsFromAPI(fetch, 'textareas');

	return {
		componentMetadataInput,
		componentMetadataTextarea
	};
}) satisfies PageServerLoad;
