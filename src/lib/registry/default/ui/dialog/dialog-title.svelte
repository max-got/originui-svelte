<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	class={cn('text-lg font-semibold tracking-tight', className)}
	{...restProps}
/>
