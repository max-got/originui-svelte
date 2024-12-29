<script lang="ts">
	import AlertDialogOverlay from './alert-dialog-overlay.svelte';
	import { cn } from '$lib/utils.js';

	import { AlertDialog as AlertDialogPrimitive, type WithoutChild } from 'bits-ui';

	let {
		class: className,
		portalProps,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<AlertDialogPrimitive.ContentProps> & {
		portalProps?: AlertDialogPrimitive.PortalProps;
	} = $props();
</script>

<AlertDialogPrimitive.Portal {...portalProps}>
	<AlertDialogOverlay />
	<AlertDialogPrimitive.Content
		bind:ref
		class={cn(
			'fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100%-4rem)] w-full -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border border-border bg-background p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[400px] sm:rounded-xl',
			className
		)}
		{...restProps}
	/>
</AlertDialogPrimitive.Portal>
