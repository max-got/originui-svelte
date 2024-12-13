<script lang="ts">
	import type {
		AvailableComponentMetadata,
		ComingSoonComponentMetadata,
		ComponentMetadata,
		UnavailableComponentMetadata
	} from '$data/api/components.handler';
	import type { WithElementRef } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		availableComponent: Snippet<[{ data: AvailableComponentMetadata }]>;
		comingSoonComponent: Snippet<[{ data: ComingSoonComponentMetadata }]>;
		componentCategories: ComponentMetadata[][];
		unavailableComponent: Snippet<[{ data: UnavailableComponentMetadata }]>;
	};

	let {
		availableComponent,
		class: className,
		comingSoonComponent,
		componentCategories,
		ref = $bindable(null),
		unavailableComponent,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'grid max-w-6xl grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12',
		className
	)}
	{...restProps}
>
	{#each componentCategories as componentCategory}
		{#each componentCategory as component (component.id)}
			{@const componentIsAvailable = component.availability === 'available'}
			{@const componentIsComingSoon = component.availability === 'soon'}
			{@const componentIsUnavailable = component.availability === 'todo'}

			{#if componentIsUnavailable}
				{@render unavailableComponent({ data: component })}
			{:else if componentIsComingSoon}
				{@render comingSoonComponent({
					data: component
				})}
			{:else if componentIsAvailable}
				{@render availableComponent({ data: component })}
			{/if}
		{/each}
	{/each}
</div>
