<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: CommandPrimitive.ListProps = $props();
</script>

<CommandPrimitive.List
	class={cn('max-h-80 overflow-x-hidden overflow-y-auto', className)}
	{...restProps}
	bind:ref
/>
