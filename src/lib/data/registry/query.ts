/* eslint-disable perfectionist/sort-modules */
import type { RegistryItem } from '@shadcn-svelte/registry';
import type { RegistryTag } from '$lib/registry/tags';

import { categories, type CategorySlugs } from '$lib/components';

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

export function getCategoriesWithDetails() {
	const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

	const categoriesWithDetails = categories
		.map((category) => {
			const componentsWithDetails = category.components.map((component) => {
				const compInRegistry = componentsMap.get(component.name);

				return {
					...component,
					available: !!compInRegistry,
					todo: compInRegistry?.meta?.todo ?? false
				};
			});

			const availableComponents = componentsWithDetails.filter((c) => c.available);

			return {
				...category,
				components: componentsWithDetails,
				total: category.components.length,
				totalAvailable: availableComponents.length,
				totalWithTodo: availableComponents.filter((c) => c.todo).length
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	return categoriesWithDetails;
}

export type CategoryWithDetails = ReturnType<typeof getCategoriesWithDetails>[number];

export function getCategoryWithDetails(slug: CategorySlugs): CategoryWithDetails {
	const category = categories.find((category) => category.slug === slug);

	const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

	return {
		...category!,
		components: category!.components.map((component) => {
			const compInRegistry = componentsMap.get(component.name)!;
			return {
				...component,
				available: !!compInRegistry,
				todo: compInRegistry?.meta?.todo ?? false
			};
		})
	};
}
