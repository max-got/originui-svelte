<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Tabs as TabsPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		value,
		...restProps
	}: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	class={cn(
		'mt-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70',
		className
	)}
	{value}
	{...restProps}
/>
