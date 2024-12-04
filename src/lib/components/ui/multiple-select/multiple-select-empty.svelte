<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: CommandPrimitive.EmptyProps = $props();
</script>

<div
	class={cn('py-6 text-center text-sm', className)}
	data-command-empty=""
	role="presentation"
	{...restProps}
>
	{@render children?.()}
</div>
