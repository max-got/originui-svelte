<script lang="ts">
	import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import CopyButton from '../copy-button.svelte';
	import ViewComponentButton from '../view-component-button.svelte';
	import { cn } from '$lib/utils.js';

	import { page } from '$app/stores';

	type DemoComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		componentData: AvailableOUIComponent;
		onShallowRouteClick?: (e: MouseEvent, componentUrl: string) => void;
	};

	let {
		class: className,
		componentData,
		onShallowRouteClick,
		ref = $bindable(null),
		...restProps
	}: DemoComponentProps = $props();

	const Component = $derived(componentData.component);

	const componentUrl = $derived(`${$page.url.href}/${componentData.directory}/${componentData.id}`);
</script>

{#snippet actionButtons({ source }: { source: string })}
	<div class={cn('absolute right-2 top-2 z-10 flex items-center gap-x-2 rounded-lg')}>
		<ViewComponentButton
			href={componentUrl}
			onToggle={(e) => onShallowRouteClick?.(e, componentUrl)}
		/>
		<div class="h-6 w-px bg-border"></div>
		<CopyButton code={source} />
	</div>
{/snippet}

<div bind:this={ref} class={cn('group/item relative bg-background', className)} {...restProps}>
	{@render actionButtons({ source: componentData.code.raw.content })}

	<Component />
</div>
