<script lang="ts">
	import { cn } from '$lib/utils.js';

	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip';
	import { Slider as SliderPrimitive, type WithoutChildrenOrChild } from 'bits-ui';

	let {
		class: className,
		orientation = 'horizontal',
		ref = $bindable(null),
		showTooltip = false,
		tooltipContent,
		value = $bindable(),
		...restProps
	}: WithoutChildrenOrChild<
		SliderPrimitive.RootProps & {
			showTooltip?: boolean;
			tooltipContent?: (value: number) => number | string;
		}
	> = $props();

	let tooltipOpen = $state(false);

	function handlePointerUp() {
		tooltipOpen = false;
	}

	function handlePointerDown() {
		tooltipOpen = true;
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
		class="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm outline-none ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
		{...props}
	/>
{/snippet}

<SliderPrimitive.Root
	bind:ref
	bind:value={value as never}
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
		{#each thumbs as index (index)}
			{#if !showTooltip}
				{@render thumb({ index })}
			{:else}
				<TooltipProvider>
					<Tooltip bind:open={tooltipOpen}>
						<TooltipTrigger>
							{#snippet child({ props })}
								{@render thumb({
									index,
									...props,
									onpointerdown: handlePointerDown
								})}
							{/snippet}
						</TooltipTrigger>
						<TooltipContent
							side={orientation === 'vertical' ? 'right' : 'top'}
							sideOffset={8}
							class="z-50 overflow-hidden rounded-md border border-input bg-popover px-2 py-1 text-xs text-muted-foreground outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
						>
							{#if Array.isArray(value)}
								{tooltipContent ? tooltipContent(value[index]!) : value[index]!}
							{:else}
								{tooltipContent ? tooltipContent(value!) : value!}
							{/if}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			{/if}
		{/each}
	{/snippet}
</SliderPrimitive.Root>
