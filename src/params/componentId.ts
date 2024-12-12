import type { ParamMatcher } from '@sveltejs/kit';

import { OUI_DIRECTORIES } from '$lib/componentRegistry.types';

export const match = ((
	param: string
): param is (typeof OUI_DIRECTORIES)[keyof typeof OUI_DIRECTORIES]['components'][number] => {
	return Object.values(OUI_DIRECTORIES).some((route) =>
		route.components.some((componentId) => {
			const componentName = componentId.split('.');
			return !componentId.includes('.todo.') && componentName[0] === param;
		})
	);
}) satisfies ParamMatcher;
