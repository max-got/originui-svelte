import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch }) => {
	const componentMetadataAlert = await fetchComponentsFromAPI(fetch, 'alerts.json');
	const componentMetadataNotification = await fetchComponentsFromAPI(fetch, 'notifications.json');
	const componentMetadataBanner = await fetchComponentsFromAPI(fetch, 'banners.json');

	return {
		componentMetadataAlert,
		componentMetadataNotification,
		componentMetadataBanner
	};
}) satisfies PageServerLoad;
