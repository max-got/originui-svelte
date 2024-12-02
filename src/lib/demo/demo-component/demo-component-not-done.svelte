<script lang="ts">
	import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';

	import { cn } from '$lib/utils.js';

	let {
		class: className,
		componentData
	}: {
		class?: string;
		componentData: AvailableOUIComponent;
		onShallowRoute?: (e: MouseEvent) => void;
	} = $props();

	const Component = $derived(componentData.component);
</script>

<div class={cn('group/item relative ', className)}>
	<Component />
</div>
