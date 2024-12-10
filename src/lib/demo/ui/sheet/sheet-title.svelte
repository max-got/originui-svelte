<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Dialog as SheetPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title
	bind:ref
	class={cn('text-lg font-semibold text-foreground', className)}
	{...restProps}
/>
