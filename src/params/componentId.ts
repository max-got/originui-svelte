import type { ParamMatcher } from '@sveltejs/kit';
import type { OUIReadyComponents } from '$lib/componentRegistry.types';

import { OUI_DIRECTORIES } from '$lib/componentRegistry.components';

export const match = ((param: string): param is OUIReadyComponents => {
	console.log('param', param);
	return Object.values(OUI_DIRECTORIES).some((route) =>
		route.components.some((componentId) => {
			const componentName = componentId.split('.');
			console.log('componentName', componentName);
			return (
				(!componentId.includes('.todo.') || componentId.includes('.soon.')) &&
				componentName[0] === param
			);
		})
	);
}) satisfies ParamMatcher;
