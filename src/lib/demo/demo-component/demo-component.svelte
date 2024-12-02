<script lang="ts">
	import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';

	import CopyButton from '../copy-button.svelte';
	import ViewComponentButton from '../view-component-button.svelte';
	import { cn } from '$lib/utils.js';

	import { page } from '$app/stores';

	let {
		class: className,
		componentData,
		onShallowRouteClick
	}: {
		class?: string;
		componentData: AvailableOUIComponent;
		onShallowRouteClick?: (e: MouseEvent, componentUrl: string) => void;
	} = $props();

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

<div id="component-{componentData.id}" class={cn('group/item relative ', className)}>
	{@render actionButtons({ source: componentData.code.raw.content })}

	<Component />
</div>
