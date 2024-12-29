<script lang="ts">
	import type { ComingSoonComponentMetadata } from '$data/api/components.handler';

	import AsyncComponentLoader from '../async-component-loader.svelte';
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		componentData
	}: {
		class?: string;
		componentData: ComingSoonComponentMetadata;
		onShallowRoute?: (e: MouseEvent) => void;
	} = $props();
</script>

<div class={cn('group/item relative ', className)}>
	<AsyncComponentLoader componentId={componentData.id} directory={componentData.directory}>
		{#snippet child({ Component })}
			<Component />
		{/snippet}
	</AsyncComponentLoader>
</div>
