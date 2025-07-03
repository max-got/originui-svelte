<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface StepperContextValue {
		activeStep: number;
		setActiveStep: (step: number) => void;
	}

	interface StepItemContextValue {
		step: number;
		isDisabled: boolean;
		orientation: 'horizontal' | 'vertical';
	}

	let {
		className = '',
		children,
		...restProps
	}: {
		className?: string;
		children?: Snippet;
	} = $props();

	const stepperCtx = getContext<StepperContextValue>('StepperContext');
	const stepItemCtx = getContext<StepItemContextValue>('StepItemContext');

	if (!stepperCtx || !stepItemCtx) {
		throw new Error('StepperTrigger must be used within a StepperItem, which is within a Stepper');
	}

	function handleClick() {
		if (!stepItemCtx.isDisabled) {
			stepperCtx.setActiveStep(stepItemCtx.step);
		}
	}
</script>

<button
	type="button"
	data-slot="stepper-trigger"
	class={cn(
		'group/trigger ring-offset-background focus-visible:ring-ring inline-flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
		stepItemCtx.orientation === 'vertical' ? 'w-full flex-col items-start gap-y-1.5' : '',
		className
	)}
	disabled={stepItemCtx.isDisabled}
	onclick={handleClick}
	{...restProps}
>
	{@render children?.()}
</button>
