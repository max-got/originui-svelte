<script lang="ts">
	import type {
		AvailableOUIComponent,
		UnavailableOUIComponent
	} from '$lib/utils/handleComponentSource';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	type Props = HTMLAttributes<HTMLDivElement> & {
		availableComponent: Snippet<[{ availableComponentData: AvailableOUIComponent }]>;
		componentCategories: (AvailableOUIComponent | UnavailableOUIComponent)[][];
		notAvailableComponent: Snippet<[{ componentData: UnavailableOUIComponent }]>;
		notDoneComponent: Snippet<[{ componentData: AvailableOUIComponent }]>;
	};

	let {
		availableComponent,
		class: className,
		componentCategories,
		notAvailableComponent,
		notDoneComponent,
		...restProps
	}: Props = $props();
</script>

<div
	class={cn(
		'grid max-w-6xl grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:bg-border/70 [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:before:[inset-inline-start:-1px] [&>*]:after:absolute [&>*]:after:bg-border/70 [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] [&>*]:after:[inset-inline-start:0] sm:[&>*]:px-8 xl:[&>*]:px-12',
		className
	)}
	{...restProps}
>
	{#each componentCategories as componentCategory}
		{#each componentCategory as componentData (componentData.id)}
			{#if componentData.available && !componentData.id.includes('.todo')}
				{@render availableComponent({ availableComponentData: componentData })}
			{:else if componentData.available && componentData.id.includes('.todo')}
				{@render notDoneComponent({ componentData })}
			{:else if !componentData.available}
				{@render notAvailableComponent({ componentData })}
			{:else}
				{@render notDoneComponent({ componentData })}
			{/if}
		{/each}
	{/each}
</div>
