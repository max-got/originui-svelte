import type { ParamMatcher } from '@sveltejs/kit';
import type { OUIReadyComponents } from '$lib/componentRegistry.types';

import { OUI_DIRECTORIES } from '$lib/componentRegistry.components';

export const match = ((param: string): param is OUIReadyComponents => {
	return Object.values(OUI_DIRECTORIES).some((route) =>
		route.components.some((componentId) => {
			const componentName = componentId.split('.');
			return !componentId.includes('.todo.') && componentName[0] === param;
		})
	);
}) satisfies ParamMatcher;
