<script lang="ts">
	import { getContext, setContext, onMount, type Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type StepState = 'active' | 'completed' | 'inactive' | 'loading';

	interface StepperContextValue {
		activeStep: number;
		orientation: 'horizontal' | 'vertical';
		incrementTotalSteps: () => number;
	}

	interface StepItemContextValue {
		step: number;
		state: StepState;
		isDisabled: boolean;
		isLoading: boolean;
		orientation: 'horizontal' | 'vertical';
	}

	let {
		step: explicitStep,
		completed = false,
		disabled = false,
		loading = false,
		className = '',
		children,
		...restProps
	}: {
		step?: number;
		completed?: boolean;
		disabled?: boolean;
		loading?: boolean;
		className?: string;
		children?: Snippet;
	} = $props();

	const stepperCtx = getContext<StepperContextValue>('StepperContext');
	if (!stepperCtx) {
		throw new Error('StepperItem must be used within a Stepper');
	}

	let itemStep = $state(explicitStep ?? 0);
	let itemState = $state<StepState>('inactive');
	let itemIsLoading = $state(false);

	onMount(() => {
		if (explicitStep === undefined) {
			itemStep = stepperCtx.incrementTotalSteps();
		}
	});

	$effect(() => {
		const isActive = stepperCtx.activeStep === itemStep;
		itemIsLoading = loading && isActive;
		if (completed || itemStep < stepperCtx.activeStep) {
			itemState = 'completed';
		} else if (isActive) {
			itemState = 'active';
		} else {
			itemState = 'inactive';
		}
	});

	const stepItemCtx: StepItemContextValue = {
		get step() {
			return itemStep;
		},
		get state() {
			return itemState;
		},
		get isDisabled() {
			return disabled;
		},
		get isLoading() {
			return itemIsLoading;
		},
		get orientation() {
			return stepperCtx.orientation;
		}
	};

	setContext('StepItemContext', stepItemCtx);
</script>

<div
	data-slot="stepper-item"
	class={cn(
		'group/step flex items-center',
		stepperCtx.orientation === 'horizontal' ? 'flex-row' : 'flex-col',
		className
	)}
	data-state={itemState}
	data-orientation={stepperCtx.orientation}
	data-loading={itemIsLoading ? '' : undefined}
	{...restProps}
>
	{@render children?.()}
</div>
