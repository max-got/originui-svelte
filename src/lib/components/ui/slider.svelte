<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Slider as SliderPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { Popover as PopoverPrimitive } from 'bits-ui';

	let {
		class: className,
		orientation = 'horizontal',
		ref = $bindable(null),
		showTooltip = false,
		tooltipContent,
		value = $bindable([0]),
		...restProps
	}: WithoutChildrenOrChild<
		SliderPrimitive.RootProps & {
			showTooltip?: boolean;
			tooltipContent?: (value: number) => number | string;
		}
	> = $props();

	let tooltipOpen = $state(false);

	function handlePointerUp() {
		if (tooltipOpen) tooltipOpen = false;
	}

	function handlePointerDown() {
		showTooltip = true;
	}

	$effect(() => {
		if (showTooltip) {
			document.addEventListener('pointerup', handlePointerUp);
			return () => document.removeEventListener('pointerup', handlePointerUp);
		}
	});
</script>

{#snippet thumb(props: SliderPrimitive.ThumbProps)}
	<SliderPrimitive.Thumb
		class="block h-5 w-5 rounded-full border-2 border-primary bg-background transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring/40 aria-disabled:cursor-not-allowed"
		{...props}
	/>
{/snippet}

<SliderPrimitive.Root
	bind:ref
	bind:value
	{orientation}
	class={cn(
		'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ thumbs })}
		<span
			data-orientation={orientation}
			class="relative grow overflow-hidden rounded-full bg-secondary data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2"
		>
			<SliderPrimitive.Range
				data-orientation={orientation}
				class="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
			/>
		</span>
		{#each thumbs as index}
			{#if !showTooltip}
				{@render thumb({ index })}
			{:else}
				<PopoverPrimitive.Root bind:open={tooltipOpen}>
					<PopoverPrimitive.Trigger>
						{#snippet child({ props })}
							{@render thumb({
								index,
								onpointerdown: handlePointerDown,
								...props
							})}
						{/snippet}
					</PopoverPrimitive.Trigger>
					<PopoverPrimitive.Content
						side={orientation === 'vertical' ? 'right' : 'top'}
						sideOffset={8}
						onOpenAutoFocus={(e) => e.preventDefault()}
						class="z-50 overflow-hidden rounded-md border border-input bg-popover px-2 py-1 text-xs text-muted-foreground outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
					>
						{tooltipContent ? tooltipContent(value[index]) : value[index]}
					</PopoverPrimitive.Content>
				</PopoverPrimitive.Root>
			{/if}
		{/each}
	{/snippet}
</SliderPrimitive.Root>
