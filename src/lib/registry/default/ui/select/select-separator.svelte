<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn('bg-border -mx-1 my-1 h-px', className)}
	{...restProps}
/>
