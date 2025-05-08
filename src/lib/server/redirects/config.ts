import type { OUIDirectory } from '$lib/componentRegistry.types';

//"hover-cards" was an old directory
type OLDComponentRoute = {
	componentDirectory: ('hover-cards' | OUIDirectory)[];
	path: string;
};

const OLD_COMPONENT_ROUTES = {
	accordions: {
		componentDirectory: ['accordions'],
		path: 'accordions'
	},
	alertsNotificationsBanners: {
		componentDirectory: ['alerts', 'notifications', 'banners'],
		path: 'alerts-notifications-banners'
	},
	avatarAndBadges: {
		componentDirectory: ['avatars', 'badges'],
		path: 'avatar-badges'
	},
	breadcrumbsAndPaginations: {
		componentDirectory: ['breadcrumbs', 'paginations'],
		path: 'breadcrumbs-paginations'
	},
	buttons: {
		componentDirectory: ['buttons'],
		path: 'buttons'
	},
	checkboxesRadiosSwitches: {
		componentDirectory: ['checkboxes', 'radios', 'switches'],
		path: 'checks-radios-switches'
	},
	dialogs: {
		componentDirectory: ['dialogs'],
		path: 'dialogs'
	},
	dropdownsPopovers: {
		componentDirectory: ['dropdowns', 'popovers'],
		path: 'dropdowns-popovers'
	},
	inputsTextareas: {
		componentDirectory: ['inputs', 'textareas'],
		path: 'inputs'
	},
	selects: {
		componentDirectory: ['selects'],
		path: 'selects'
	},
	sliders: {
		componentDirectory: ['sliders'],
		path: 'sliders'
	},
	tabs: {
		componentDirectory: ['tabs'],
		path: 'tabs'
	},
	tooltipsHovercards: {
		componentDirectory: ['tooltips', 'hover-cards'],
		path: 'tooltips'
	}
} as const satisfies Record<string, OLDComponentRoute>;

export type RedirectMap = Record<string, RedirectConfig>;

interface RedirectConfig {
	componentDirectories?: {
		[oldDirectory: string]: string; // maps from old directory to new base path
	};
	destination: string;
	dynamic?: boolean;
}

// Create redirects from COMPONENT_ROUTES
function createRedirectsFromRoutes(): RedirectMap {
	const redirects: RedirectMap = {};

	Object.values(OLD_COMPONENT_ROUTES).forEach((route: OLDComponentRoute) => {
		const oldPath = `/${route.path}`;
		const newPath = `/${route.componentDirectory[0]}`;

		// Create directory mappings
		const directoryMappings: Record<string, string> = {};
		route.componentDirectory.forEach((dir) => {
			// Each directory in the array maps to its own base path
			directoryMappings[dir] = `/${dir}`;
		});

		// Only add the redirect if the old path is different from the new path
		if (oldPath !== newPath) {
			redirects[oldPath] = {
				componentDirectories: directoryMappings,
				destination: newPath,
				dynamic: true
			};
		}
	});

	return redirects;
}

export const redirects = createRedirectsFromRoutes();
