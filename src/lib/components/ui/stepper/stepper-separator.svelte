<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils.js';

	type StepState = 'active' | 'completed' | 'inactive' | 'loading';

	interface StepperContextValue {
		orientation: 'horizontal' | 'vertical';
	}

	interface StepItemContextValue {
		state: StepState;
	}

	let {
		className = '',
		...restProps
	}: {
		className?: string;
	} = $props();

	const stepperCtx = getContext<StepperContextValue>('StepperContext');
	const stepItemCtx = getContext<StepItemContextValue>('StepItemContext'); // Assumes separator is child of StepperItem

	if (!stepperCtx || !stepItemCtx) {
		throw new Error(
			'StepperSeparator must be used within a StepperItem, which is within a Stepper'
		);
	}
</script>

<div
	data-slot="stepper-separator"
	class={cn(
		'group-data-[state=completed]/step:bg-primary',
		'group-data-[state=active]/step:bg-border',
		'group-data-[state=inactive]/step:bg-border',
		stepperCtx.orientation === 'horizontal' ? 'h-px flex-1' : 'min-h-4 w-px flex-auto',
		className
	)}
	data-orientation={stepperCtx.orientation}
	data-state={stepItemCtx.state}
	{...restProps}
></div>
