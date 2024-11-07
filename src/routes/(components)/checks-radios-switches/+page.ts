import type { PageLoad } from './$types.js';

import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const prerender = true;

export const load = (async ({ data }) => {
	const { componentMetadataCheckbox, componentMetadataRadio, componentMetadataSwitch } = data;

	const switchComponents = await Promise.all(
		componentMetadataSwitch.map((component) => createComponentRender(component))
	);
	const radioComponents = await Promise.all(
		componentMetadataRadio.map((component) => createComponentRender(component))
	);
	const checkboxComponents = await Promise.all(
		componentMetadataCheckbox.map((component) => createComponentRender(component))
	);

	return { checkboxComponents, radioComponents, switchComponents };
}) satisfies PageLoad;
