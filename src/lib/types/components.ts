import type { Component } from 'svelte';

export interface ComponentMetadata {
	code: {
		copyable: { content: string };
		highlighted: { content: string };
		preview: { content: string };
	};
	id: string;
	path: string;
}

export type ComponentRender = ComponentMetadata & {
	render: Component;
};

export interface ComponentDirectory {
	directory: string;
	files: string[];
}
