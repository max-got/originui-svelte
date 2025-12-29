<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';
	import { buttonVariants } from '$lib/registry/default/ui/button.svelte';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.CancelProps = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	class={cn(buttonVariants({ variant: 'outline' }), className)}
	{...restProps}
/>
