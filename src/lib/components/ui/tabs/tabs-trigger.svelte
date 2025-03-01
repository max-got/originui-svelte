<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Tabs as TabsPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		value,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	class={cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-all hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-[selected=true]:text-foreground aria-[selected=true]:shadow-sm data-[state=active]:bg-background [&_svg]:shrink-0',
		className
	)}
	{value}
	{...restProps}
/>
