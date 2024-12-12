<script lang="ts">
	import type {
		AvailableComponentMetadata,
		AvailableOUIComponent
	} from '$data/api/components.handler';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import AsyncComponentLoader from '../async-component-loader.svelte';
	import CopyButton from '../copy-button.svelte';
	import ViewComponentButton from '../view-component-button.svelte';
	import { cn } from '$lib/utils.js';

	import { page } from '$app/stores';

	type DemoComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		componentData: AvailableComponentMetadata;
		onShallowRouteClick?: (
			e: MouseEvent,
			{ componentUrl, data }: { componentUrl: string; data: AvailableOUIComponent }
		) => void;
	};

	let {
		class: className,
		componentData,
		onShallowRouteClick,
		ref = $bindable(null),
		...restProps
	}: DemoComponentProps = $props();

	const componentUrl = $derived(`${$page.url.href}/${componentData.directory}/${componentData.id}`);

	let fullComponentData = $state<AvailableOUIComponent | null>(null);
</script>

{#snippet actionButtons({ source }: { source: string })}
	<div class={cn('absolute right-2 top-2 z-10 flex items-center gap-x-2 rounded-lg')}>
		<ViewComponentButton
			href={componentUrl}
			onToggle={(e) => onShallowRouteClick?.(e, { componentUrl, data: fullComponentData! })}
		/>
		<div class="h-6 w-px bg-border"></div>
		<CopyButton code={source} />
	</div>
{/snippet}

<div bind:this={ref} class={cn('group/item relative bg-background', className)} {...restProps}>
	<AsyncComponentLoader
		componentId={componentData.id}
		directory={componentData.directory}
		onComponentLoaded={(component) => {
			fullComponentData = {
				...componentData,
				component
			};
		}}
	>
		{#snippet child({ Component })}
			{@render actionButtons({ source: componentData.code.raw.content })}
			<Component />
		{/snippet}
	</AsyncComponentLoader>
</div>
