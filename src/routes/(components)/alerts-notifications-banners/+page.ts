import type { PageLoad } from './$types.js';

import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const prerender = true;

export const load = (async ({ data }) => {
	const { componentMetadataAlert, componentMetadataNotification, componentMetadataBanner } = data;

	const alertComponents = await Promise.all(
		componentMetadataAlert.map((component) => createComponentRender(component))
	);
	const notificationComponents = await Promise.all(
		componentMetadataNotification.map((component) => createComponentRender(component))
	);
	const bannerComponents = await Promise.all(
		componentMetadataBanner.map((component) => createComponentRender(component))
	);

	return { alertComponents, notificationComponents, bannerComponents };
}) satisfies PageLoad;
