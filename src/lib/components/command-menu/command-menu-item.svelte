<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import * as Command from '$lib/components/ui/command/index.js';
	import { cn } from '$lib/utils.js';

	function useMutationObserver(
		ref: () => HTMLElement | null,
		callback: MutationCallback,
		options: MutationObserverInit = {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true
		}
	): void {
		const element = $derived(ref());
		$effect(() => {
			if (!element) return;
			const observer = new MutationObserver(callback);
			observer.observe(element, options);
			return () => observer.disconnect();
		});
	}

	let {
		children,
		class: className,
		onHighlight,
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Command.Item> & {
		'aria-selected'?: boolean;
		'data-selected'?: string;
		onHighlight?: () => void;
	} = $props();

	// useMutationObserver(
	// 	() => ref,
	// 	(mutations) => {
	// 		for (const mutation of mutations) {
	// 			if (
	// 				mutation.type === 'attributes' &&
	// 				mutation.attributeName === 'aria-selected' &&
	//
	// 				ref?.getAttribute('aria-selected') === 'true'
	// 			) {
	// 				onHighlight?.();
	// 			}
	// 		}
	// 	},
	// 	{
	// 		attributes: true
	// 	}
	// );
</script>

<Command.Item
	bind:ref
	class={cn(
		'data-[selected=true]:bg-/50 h-9 rounded-md border border-transparent !px-3 font-medium data-[selected=true]:bg-red-500',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Command.Item>
