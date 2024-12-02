import type { OUIDirectory } from '$lib/componentRegistry.types';

type MetadataVariables = {
	count: string;
};

type ComponentRoutes = {
	componentDirectory: OUIDirectory[];
	header: {
		description: string;
		title: string;
	};
	path: string;
};

export const COMPONENT_ROUTES = {
	buttons: {
		componentDirectory: ['buttons'],
		header: {
			description:
				'A growing collection of over ${count} button components built with Svelte and TailwindCSS.',
			title: 'Button'
		},
		path: 'buttons'
	},
	checkboxes: {
		componentDirectory: ['checkboxes', 'radios', 'switches'],
		header: {
			description:
				'A growing collection of over ${count} checkbox components built with Svelte and TailwindCSS.',
			title: 'Checkbox'
		},
		path: 'checks-radios-switches'
	},
	inputs: {
		componentDirectory: ['inputs', 'textareas'],
		header: {
			description:
				'A growing collection of over ${count} input and textarea components built with Svelte and TailwindCSS.',
			title: 'Input'
		},
		path: 'inputs'
	},
	sliders: {
		componentDirectory: ['sliders'],
		header: {
			description:
				'A growing collection of over ${count} slider components built with Svelte and TailwindCSS.',
			title: 'Slider'
		},
		path: 'sliders'
	}
} as const satisfies Record<string, ComponentRoutes>;

type ComponentRoutePath = (typeof COMPONENT_ROUTES)[keyof typeof COMPONENT_ROUTES]['path'];

function assertRouteExists(path: ComponentRoutePath) {
	const route = Object.values(COMPONENT_ROUTES).find((route) => route.path === path);
	if (!route) throw new Error(`Route for ${path} not found`);
	return route;
}

export function getComponentRouteDirectories(path: ComponentRoutePath) {
	const route = assertRouteExists(path);
	return route.componentDirectory;
}

export function getComponentRouteMetadata(
	path: ComponentRoutePath,
	variables?: Partial<MetadataVariables>
) {
	const routeMetadata = assertRouteExists(path);

	if (!variables) return routeMetadata;

	let description = routeMetadata.header.description;
	for (const [key, value] of Object.entries(variables)) {
		description = description.replace(`\${${key}}`, String(value)) as typeof description;
	}

	return {
		...routeMetadata,
		header: {
			...routeMetadata.header,
			description
		}
	};
}
