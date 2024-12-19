import type { OUIDirectory } from '$lib/componentRegistry.types';

type MetadataVariables = {
	count: string;
};

type SEOMetadata = {
	description: string;
	keywords?: string;
	title: string;
	twitterDescription: string;
	twitterTitle: string;
};

type ComponentRoutes = {
	componentDirectory: OUIDirectory[];
	header: {
		description: string;
		title: string;
	};
	label: string;
	order: number;
	path: string;
	seo: SEOMetadata;
};

export const COMPONENT_ROUTES = {
	accordions: {
		componentDirectory: ['accordions'],
		header: {
			description:
				'A growing collection of ${count} accordion components built with Svelte and TailwindCSS.',
			title: 'Accordion'
		},
		label: 'Accordions',
		order: 8,
		path: 'accordions',
		seo: {
			description:
				'An extensive collection of copy-and-paste Accordion components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'accordion, collapsible, component, svelte, tailwindcss',
			title: 'Accordions',
			twitterDescription:
				'An extensive collection of copy-and-paste Accordion components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Accordions'
		}
	},
	alertsNotificationsBanners: {
		componentDirectory: ['alerts', 'notifications', 'banners'],
		header: {
			description:
				'A growing collection of ${count} alert, notification, and banner components built with Svelte and TailwindCSS.',
			title: 'Alert, Notification, and Banner'
		},
		label: 'Alerts, Notifications, and Banners',
		order: 6,
		path: 'alerts-notifications-banners',
		seo: {
			description:
				'An extensive collection of copy-and-paste Alert, Notification, and Banner components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'alert, notification, banner, component, svelte, tailwindcss',
			title: 'Alerts, Notifications, and Banners',
			twitterDescription:
				'An extensive collection of copy-and-paste Alert, Notification, and Banner components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Alerts, Notifications, and Banners'
		}
	},
	avatarAndBadges: {
		componentDirectory: ['avatars', 'badges'],
		header: {
			description:
				'A growing collection of ${count} avatar and badge components built with Svelte and TailwindCSS.',
			title: 'Avatar and Badges'
		},
		label: 'Avatar and Badges',
		order: 11,
		path: 'avatar-badges',
		seo: {
			description:
				'An extensive collection of copy-and-paste Tooltip and Hover Card components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'avatar, badge, component, svelte, tailwindcss',
			title: 'Avatar and Badges',
			twitterDescription:
				'An extensive collection of copy-and-paste Avatar and Badge components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Avatar and Badges'
		}
	},
	buttons: {
		componentDirectory: ['buttons'],
		header: {
			description:
				'A growing collection of over ${count} button components built with Svelte and TailwindCSS.',
			title: 'Button'
		},
		label: 'Buttons',
		order: 2,
		path: 'buttons',
		seo: {
			description:
				'An extensive collection of copy-and-paste Button components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'button, component, svelte, tailwindcss',
			title: 'Buttons',
			twitterDescription:
				'An extensive collection of copy-and-paste Button components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Buttons'
		}
	},
	checkboxesRadiosSwitches: {
		componentDirectory: ['checkboxes', 'radios', 'switches'],
		header: {
			description:
				'A growing collection of over ${count} checkbox components built with Svelte and TailwindCSS.',
			title: 'Checkbox'
		},
		label: 'Checkboxes, Radios, and Switches',
		order: 3,
		path: 'checks-radios-switches',
		seo: {
			description:
				'An extensive collection of copy-and-paste Checkbox, Radio, and Switch components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'checkbox, radio, switch, component, svelte, tailwindcss',
			title: 'Checkboxes, Radios, and Switches',
			twitterDescription:
				'An extensive collection of copy-and-paste Checkbox, Radio, and Switch components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Checkboxes, Radios, and Switches'
		}
	},
	dialogs: {
		componentDirectory: ['dialogs'],
		header: {
			description:
				'A growing collection of over ${count} dialog components built with Svelte and TailwindCSS.',
			title: 'Dialog'
		},
		label: 'Dialogs',
		order: 7,
		path: 'dialogs',
		seo: {
			description:
				'An extensive collection of copy-and-paste Dialog components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'dialog, component, svelte, tailwindcss',
			title: 'Dialogs',
			twitterDescription:
				'An extensive collection of copy-and-paste Dialog components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Dialogs'
		}
	},
	dropdownsPopovers: {
		componentDirectory: ['dropdowns', 'popovers'],
		header: {
			description:
				'A growing collection of ${count} dropdown and popover components built with Svelte and TailwindCSS.',
			title: 'Dropdown and Popover'
		},
		label: 'Dropdowns and Popovers',
		order: 10,
		path: 'dropdowns-popovers',
		seo: {
			description:
				'An extensive collection of copy-and-paste Dropdown and Popover components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'dropdown, popover, component, svelte, tailwindcss',
			title: 'Dropdowns and Popovers',
			twitterDescription:
				'An extensive collection of copy-and-paste Dropdown and Popover components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Dropdowns and Popovers'
		}
	},
	inputsTextareas: {
		componentDirectory: ['inputs', 'textareas'],
		header: {
			description:
				'A growing collection of over ${count} input and textarea components built with Svelte and TailwindCSS.',
			title: 'Input'
		},
		label: 'Inputs',
		order: 1,
		path: 'inputs',
		seo: {
			description:
				'An extensive collection of copy-and-paste Input and Textarea components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'input, textarea, component, svelte, tailwindcss',
			title: 'Inputs and Textareas',
			twitterDescription:
				'An extensive collection of copy-and-paste Input and Textarea components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Inputs and Textareas'
		}
	},
	sliders: {
		componentDirectory: ['sliders'],
		header: {
			description:
				'A growing collection of over ${count} slider components built with Svelte and TailwindCSS.',
			title: 'Slider'
		},
		label: 'Sliders',
		order: 5,
		path: 'sliders',
		seo: {
			description:
				'An extensive collection of copy-and-paste Slider components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'slider, component, svelte, tailwindcss',
			title: 'Sliders',
			twitterDescription:
				'An extensive collection of copy-and-paste Slider components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Sliders'
		}
	},
	tabs: {
		componentDirectory: ['tabs'],
		header: {
			description:
				'A growing collection of ${count} tab components built with Svelte and TailwindCSS.',
			title: 'Tabs'
		},
		label: 'Tabs',
		order: 11,
		path: 'tabs',
		seo: {
			description:
				'An extensive collection of copy-and-paste Tab components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'tabs, component, svelte, tailwindcss',
			title: 'Tabs',
			twitterDescription:
				'An extensive collection of copy-and-paste Tab components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Tabs'
		}
	},
	tooltipsHovercards: {
		componentDirectory: ['tooltips', 'hover-cards'],
		header: {
			description:
				'A growing collection of ${count} tooltip and hover card components built with Svelte and TailwindCSS.',
			title: 'Tooltip'
		},
		label: 'Tooltips',
		order: 9,
		path: 'tooltips',
		seo: {
			description:
				'An extensive collection of copy-and-paste Tooltip and Hover Card components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			keywords: 'tooltip, hover card, component, svelte, tailwindcss',
			title: 'Tooltips and Hover Cards',
			twitterDescription:
				'An extensive collection of copy-and-paste Tooltip and Hover Card components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.',
			twitterTitle: 'Tooltips and Hover Cards'
		}
	}
} as const satisfies Record<string, ComponentRoutes>;

export type ComponentRoute = (typeof COMPONENT_ROUTES)[keyof typeof COMPONENT_ROUTES];
export type ComponentRoutePath = (typeof COMPONENT_ROUTES)[keyof typeof COMPONENT_ROUTES]['path'];

function assertRouteExists(path: ComponentRoutePath): ComponentRoute {
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
): Omit<ComponentRoute, 'header'> & {
	header: {
		description: string;
		title: string;
	};
} {
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
