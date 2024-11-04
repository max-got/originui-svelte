export const prerender = true;

import type { PageLoad } from './$types.js';
import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ data }) => {
	const { componentMetadataSwitch, componentMetadataRadio, componentMetadataCheckbox } = data;

	const switchComponents = await Promise.all(
		componentMetadataSwitch.map(async (metadata) => createComponentRender(metadata))
	);
	const radioComponents = await Promise.all(
		componentMetadataRadio.map(async (metadata) => createComponentRender(metadata))
	);
	const checkboxComponents = await Promise.all(
		componentMetadataCheckbox.map(async (metadata) => createComponentRender(metadata))
	);

	return { switchComponents, radioComponents, checkboxComponents };
}) satisfies PageLoad;
