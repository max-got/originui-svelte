<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';

	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';

	const min = 0;
	const max = 2;
	const initialValue = 1.25;

	let value = $state(initialValue);

	function reset() {
		value = initialValue;
	}

	function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
		value = parseFloat(e.currentTarget.value) || 0;
	}
</script>

<div class="space-y-3">
	<div class="flex items-center justify-between gap-2">
		<Label>Temperature</Label>
		<div class="flex items-center gap-1">
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<Button
								size="icon"
								variant="ghost"
								class="size-7"
								aria-label="Reset"
								{...props}
								onclick={reset}
							>
								<RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
							</Button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent
						class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
					>
						Reset to default
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<Input
				{value}
				class="h-7 w-12 px-2 py-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				type="number"
				inputmode="decimal"
				onchange={handleInputChange}
				step="0.01"
				{min}
				{max}
				aria-label="Enter value"
			/>
		</div>
	</div>
	<div class="flex items-center gap-4">
		<Slider
			type="single"
			bind:value
			{min}
			{max}
			class="flex-grow"
			step={0.01}
			aria-label="Temperature"
		/>
	</div>
</div>
