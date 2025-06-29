<script lang="ts">
	import type { RegistryItem } from '$data/registry/schema';
	import type { Snippet } from 'svelte';

	import { cn } from '$lib/utils';

	let {
		children,
		class: className,
		component,
		isSearchPage = false
	}: {
		children: Snippet;
		class?: string;
		component: RegistryItem;
		isSearchPage?: boolean;
	} = $props();

	const getColSpanClasses = (includeStart = false) => {
		const baseClasses =
			component.meta?.colSpan === 2
				? 'col-span-12 sm:col-span-6 lg:col-span-6'
				: component.meta?.colSpan === 3
					? 'col-span-12 sm:col-span-12 lg:col-span-12'
					: 'col-span-12 sm:col-span-6 lg:col-span-4';

		const startClasses =
			includeStart && component.meta?.colSpan !== 3
				? component.meta?.colSpan === 2
					? 'sm:col-start-4 lg:col-start-4'
					: 'sm:col-start-4 lg:col-start-5'
				: '';

		return cn(baseClasses, startClasses);
	};

	const styleClasses =
		component.meta?.style === 1
			? 'flex justify-center items-center'
			: component.meta?.style === 2
				? 'text-center'
				: '';
</script>

<div
	class={cn(
		'group/item relative border',
		'has-[[data-comp-todo=true]]:border-none',
		isSearchPage ? 'col-span-12 grid grid-cols-12' : cn(getColSpanClasses(), styleClasses),
		className
	)}
	data-slot={component.name}
>
	{#if isSearchPage}
		<div class={cn(getColSpanClasses(true), styleClasses)}>
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
