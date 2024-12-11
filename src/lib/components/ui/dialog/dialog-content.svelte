<script lang="ts">
	import type { Snippet } from 'svelte';

	import DialogOverlay from './dialog-overlay.svelte';
	import { cn } from '$lib/utils.js';

	import { Dialog as DialogPrimitive, type WithoutChild } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';

	let {
		children,
		class: className,
		portalProps,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<DialogPrimitive.ContentProps> & {
		children: Snippet;
		portalProps?: DialogPrimitive.PortalProps;
	} = $props();
</script>

<DialogPrimitive.Portal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		class={cn(
			'fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100%-4rem)] w-full -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border border-border bg-background p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[400px] sm:rounded-xl',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<DialogPrimitive.Close
			class="group absolute right-3 top-3 flex size-7 items-center justify-center rounded-lg outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none"
		>
			<X size={16} strokeWidth={2} class="opacity-60 transition-opacity group-hover:opacity-100" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
