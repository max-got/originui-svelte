import { redirect } from '@sveltejs/kit';

import type { RedirectMap } from './config';

interface RedirectResult {
	destination?: string;
	shouldRedirect: boolean;
}

export function checkRedirect(path: string, redirects: RedirectMap): RedirectResult {
	// Check for exact matches first
	const exactMatch = redirects[path];
	if (exactMatch) {
		return {
			destination: exactMatch.destination,
			shouldRedirect: true
		};
	}

	// Then check for dynamic routes
	for (const [source, config] of Object.entries(redirects)) {
		if (config.dynamic && path.startsWith(source + '/')) {
			const { directory, id } = getComponentParts(path);

			// If no directory or id, just do the basic redirect
			if (!directory || !id) {
				return {
					destination: path.replace(source, config.destination),
					shouldRedirect: true
				};
			}

			// Check if we have a mapping for this directory
			const newBasePath = config.componentDirectories?.[directory];
			if (newBasePath) {
				// Redirect to the new base path with just the ID
				return {
					destination: `${newBasePath}/${id}`,
					shouldRedirect: true
				};
			}
		}
	}

	return {
		shouldRedirect: false
	};
}

export function createRedirectResponse(destination: string, status = 301): Response {
	redirect(status, destination);
}

function getComponentParts(path: string): { directory?: string; id?: string } {
	const parts = path.split('/').filter(Boolean);
	if (parts.length < 2) return {};
	return {
		directory: parts[1],
		id: parts[2]
	};
}
