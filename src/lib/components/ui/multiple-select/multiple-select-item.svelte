<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: CommandPrimitive.ItemProps = $props();
</script>

<CommandPrimitive.Item class={cn('cursor-pointer', className)} bind:ref {...restProps} />
