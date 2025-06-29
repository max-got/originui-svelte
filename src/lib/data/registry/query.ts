import type { RegistryTag } from '$lib/registry/tags';

import type { RegistryItem } from './schema';

import registry from '../../../../registry.json' assert { type: 'json' };

const components = registry.items as unknown as RegistryItem[];

export const getComponents = (selectedTags: RegistryTag[] = []): RegistryItem[] => {
	if (selectedTags.length === 0) return components;
	const filteredComponents = components.filter((component) =>
		selectedTags.every((tag) => component.meta?.tags?.includes(tag) ?? false)
	);

	return filteredComponents;
};

export const getComponentsByNames = (names: string[]): RegistryItem[] => {
	const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

	return names
		.map((name) => componentsMap.get(name))
		.filter((comp): comp is RegistryItem => comp !== undefined);
};
