import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch }) => {
	const componentMetadataInput = await fetchComponentsFromAPI(fetch, 'inputs.json');
	const componentMetadataTextarea = await fetchComponentsFromAPI(fetch, 'textareas.json');

	return {
		componentMetadataInput,
		componentMetadataTextarea
	};
}) satisfies PageServerLoad;
