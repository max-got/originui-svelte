<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SelectPrimitive.GroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	class={cn('text-muted-foreground py-1.5 ps-8 pe-2 text-xs font-medium', className)}
	{...restProps}
/>
