import type { RegistryItem } from '@shadcn-svelte/registry';
import type { RegistryTag } from '$lib/registry/tags';

import { type CategorySlugs, categories as componentCategories } from '$lib/components';

import registry from '../../../../registry.json' assert { type: 'json' };

const components = registry.items as unknown as RegistryItem[];

const registryMap = new Map(components.map((comp) => [comp.name, comp]));
const registryComponentNames = new Set(components.map((comp) => comp.name));

export const getComponents = (selectedTags: RegistryTag[] = []): RegistryItem[] => {
	if (selectedTags.length === 0) return components;
	const filteredComponents = components.filter((component) =>
		selectedTags.every((tag) => component.meta?.tags?.includes(tag) ?? false)
	);

	return filteredComponents;
};

type ComponentWithDetails = RegistryItem & {
	available: boolean;
};

export const getComponentsByNames = (names: string[]): ComponentWithDetails[] => {
	return names
		.map((name) => {
			const registryComp = registryMap.get(name);
			if (!registryComp)
				return {
					available: false,
					meta: {
						colSpan: 1
					},
					name
				};

			return {
				...registryComp,
				available: registryComponentNames.has(name)
			};
		})
		.filter((comp): comp is ComponentWithDetails => comp !== undefined);
};

export type CategoryWithDetails = {
	components: {
		available: boolean;
		registryItem: null | RegistryItem;
	}[];
	meta: {
		total: number;
		totalAvailable: number;
		totalNotAvailable: number;
	};
	name: string;
	slug: CategorySlugs;
};

export function getCategoriesWithDetails(): CategoryWithDetails[] {
	const categoriesWithDetails = componentCategories
		.map((category) => {
			const componentsWithDetails = category.components.map((component) => {
				const registryItem = registryMap.get(component.name) ?? null;
				return {
					available: !!registryItem,
					registryItem
				};
			});

			const totalComponents = category.components.length;
			const availableComponents = componentsWithDetails.filter((c) => c.available).length;

			return {
				...category,
				components: componentsWithDetails,
				meta: {
					total: totalComponents,
					totalAvailable: availableComponents,
					totalNotAvailable: totalComponents - availableComponents
				},
				name: category.name,
				slug: category.slug
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	return categoriesWithDetails;
}

export function getCategoryWithDetails(slug: CategorySlugs): CategoryWithDetails | undefined {
	const category = componentCategories.find((category) => category.slug === slug);
	if (!category) return undefined;

	const components = category.components.map((component) => {
		const registryItem = registryMap.get(component.name) ?? null;
		return {
			available: !!registryItem,
			registryItem
		};
	});

	const total = components.length;
	const totalAvailable = components.filter((c) => c.available).length;
	const totalNotAvailable = total - totalAvailable;

	return {
		...category,
		components,
		meta: {
			total,
			totalAvailable,
			totalNotAvailable
		}
	} satisfies CategoryWithDetails;
}
