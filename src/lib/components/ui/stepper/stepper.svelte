<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		step = $bindable(1),
		orientation = 'horizontal',
		className = '',
		children,
		...restProps
	}: {
		step: number;
		orientation?: 'horizontal' | 'vertical';
		className?: string;
		children?: Snippet;
	} = $props();

	// State
	let totalSteps = $state(0); // Will be updated by StepperItems

	// Context API
	const stepperContext = {
		get activeStep() {
			return step;
		},
		setActiveStep: (newStep: number) => {
			step = newStep;
		},
		get orientation() {
			return orientation;
		},
		get totalSteps() {
			return totalSteps;
		},
		incrementTotalSteps: () => {
			totalSteps++;
			return totalSteps; // Return the new total for StepperItem to use as its step number
		}
	};
	setContext('StepperContext', stepperContext);
</script>

<div
	role="group"
	aria-label="Stepper"
	class={cn(
		'flex w-full flex-wrap items-center justify-between gap-2',
		orientation === 'horizontal' ? 'flex-row' : 'flex-col',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
