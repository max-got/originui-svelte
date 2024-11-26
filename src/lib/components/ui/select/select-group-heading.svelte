<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Select as SelectPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SelectPrimitive.GroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	class={cn('py-1.5 pe-2 ps-8 text-xs font-medium text-muted-foreground', className)}
	{...restProps}
/>
