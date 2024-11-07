import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch }) => {
	const componentMetadataSwitch = await fetchComponentsFromAPI(fetch, 'switches.json');
	const componentMetadataRadio = await fetchComponentsFromAPI(fetch, 'radios.json');
	const componentMetadataCheckbox = await fetchComponentsFromAPI(fetch, 'checkboxes.json');

	return {
		componentMetadataCheckbox,
		componentMetadataRadio,
		componentMetadataSwitch
	};
}) satisfies PageServerLoad;
