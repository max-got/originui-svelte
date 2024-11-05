<script module lang="ts">
	export interface Easing {
		name: string;
		points: number[];
	}
	export type EasingFilter = 'all' | 'in' | 'out' | 'in-out';
	export type AnimationType = 'translate' | 'scale' | 'rotate';

	const EASING_FILTERS = [
		{ label: 'All', value: 'all' },
		{ label: 'In', value: 'in' },
		{ label: 'Out', value: 'out' },
		{ label: 'In-Out', value: 'in-out' }
	] as const satisfies { label: string; value: EasingFilter }[];

	const ANIMATION_TYPES = [
		{ label: 'Translate', value: 'translate' },
		{ label: 'Scale', value: 'scale' },
		{ label: 'Rotate', value: 'rotate' }
	] as const satisfies { label: string; value: AnimationType }[];
</script>

<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Label from '$lib/components/ui/label.svelte';
	import CopyClass from './copy-class.svelte';

	let { easings }: { easings: Easing[] } = $props();

	class AnimationKey<T extends Array<() => unknown>> {
		#key = $state(0);

		constructor(dependencies: T) {
			$effect(() => {
				dependencies.map((dep) => dep());

				const totalDuration = duration + pauseDuration;

				let startTime = performance.now();
				let animationId: number;

				const animate = (currentTime: number) => {
					const elapsed = currentTime - startTime;
					if (elapsed >= totalDuration) {
						startTime = currentTime;
						this.#key++;
					}

					animationId = requestAnimationFrame(animate);
				};

				animationId = requestAnimationFrame(animate);

				return () => cancelAnimationFrame?.(animationId);
			});
		}

		get key() {
			return this.#key;
		}
	}

	const defaultConfig = {
		width: 140,
		height: 140,
		padding: 20,
		plotSize: 100,
		animationDuration: 1000,
		pauseDuration: 1000
	};

	let duration = $state(defaultConfig.animationDuration);
	let tempDuration = $state(defaultConfig.animationDuration);
	let pauseDuration = $state(defaultConfig.pauseDuration);
	let animationType = $state<AnimationType>(ANIMATION_TYPES[0].value);
	let easingFilter = $state<EasingFilter>(EASING_FILTERS[0].value);

	function getFilteredEasings() {
		if (easingFilter === 'all') return easings;

		return easings.filter((easing) => {
			const name = easing.name.toLowerCase();
			switch (easingFilter) {
				case 'in':
					return (name.startsWith('easein') && !name.includes('inout')) || name === 'ease-in';
				case 'out':
					return name.startsWith('easeout') || name === 'ease-out';
				case 'in-out':
					return name.startsWith('easeinout') || name === 'ease-in-out' || name === 'ease';
				default:
					return true;
			}
		});
	}

	function handleSliderChange(value: number[]) {
		tempDuration = value[0];
	}

	function handleSliderChangeEnd(value: number[]) {
		duration = value[0];
	}

	function handleInputChange(event: Event) {
		const value = parseInt((event.target as HTMLInputElement).value, 10);
		if (!isNaN(value) && value >= 0 && value <= 5000) {
			tempDuration = value;
		}
	}

	function handleInputBlur() {
		if (tempDuration >= 0 && tempDuration <= 5000) {
			duration = tempDuration;
		} else {
			tempDuration = duration;
		}
	}

	/**
	 * Generates CSS animation style string for a circle animation
	 * @param {Easing} easing - The easing object containing bezier curve points
	 * @param {number} duration - Animation duration in milliseconds
	 * @param {number} pauseDuration - Pause duration between animations in milliseconds
	 * @returns {string} CSS style string with animation properties and CSS variables:
	 * - --bezier-coordinates: Comma-separated bezier curve coordinates
	 * - --animation-duration: Animation duration in milliseconds
	 * - --total-duration: Total duration including pause in milliseconds
	 */
	const getCircleAnimationStyle = (
		easing: Easing,
		duration: number,
		pauseDuration: number
	): string => {
		if (!easing.points.length || duration <= 0) return '';

		const variables = {
			'--bezier-coordinates': easing.points.join(','),
			'--animation-duration': duration,
			'--total-duration': duration + pauseDuration
		} as const;

		const style = {
			...variables,
			'animation-name': 'moveCircleVertically',
			'animation-duration': `calc(var(--animation-duration) * 1s)`,
			'animation-timing-function': `cubic-bezier(var(--bezier-coordinates))`,
			'animation-iteration-count': 'I',
			'animation-fill-mode': 'forwards',
			'animation-delay': '0s'
		} as const;

		return Object.entries(style)
			.map(([key, value]) => `${key}: ${value}`)
			.join(';');
	};

	/**
	 * Generates CSS animation style string for a square animation
	 * @param {Easing} easing - The easing object containing bezier curve points
	 * @returns {string} CSS style string with animation properties and CSS variables:
	 * - --bezier-coordinates: Comma-separated bezier curve coordinates
	 * - --animation-duration: Animation duration in milliseconds
	 * - --total-duration: Total duration including pause in milliseconds
	 */
	const getAnimationStyle = (easing: Easing): string => {
		if (!easing.points.length || duration <= 0) return '';

		const variables = {
			'--bezier-coordinates': easing.points.join(','),
			'--animation-duration': duration,
			'--total-duration': duration + pauseDuration
		} as const;

		const animationName = {
			translate: 'translateSquare',
			scale: 'scaleSquare',
			rotate: 'rotateSquare'
		}[animationType];

		const animationStyle = {
			...variables,
			'animation-name': animationName,
			'animation-duration': `calc(var(--animation-duration) * 1ms)`,
			'animation-timing-function': `cubic-bezier(var(--bezier-coordinates))`,
			'animation-iteration-count': '1',
			'animation-fill-mode': 'forwards',
			'animation-delay': '0s'
		};

		return Object.entries(animationStyle)
			.map(([key, value]) => `${key}: ${value}`)
			.join(';');
	};

	const animationKey = new AnimationKey([() => duration, () => pauseDuration, () => animationType]);
	const rerenderKey = $derived(`${animationKey.key}-${duration}-${pauseDuration}-${animationType}`);

	const selectedEasingsFilterLabel = $derived(
		// is ok, because deselect is not allowed
		EASING_FILTERS.find((filter) => filter.value === easingFilter)!.label
	);

	const selectedAnimationTypeLabel = $derived(
		// is ok, because deselect is not allowed
		ANIMATION_TYPES.find((type) => type.value === animationType)!.label
	);
</script>

{#snippet easingSvg({
	easing,
	config,
	duration,
	pauseDuration
}: {
	easing: Easing;
	config: typeof defaultConfig;
	duration: number;
	pauseDuration: number;
})}
	<svg
		width={config.width}
		height={config.height}
		viewBox={`0 0 ${config.width} ${config.height}`}
		class="w-full"
		style:--plot-size="{config.plotSize}px"
	>
		<!-- Grid -->
		<rect
			x={config.padding}
			y={config.padding}
			width={config.plotSize}
			height={config.plotSize}
			class="fill-none stroke-muted-foreground/20"
			stroke-width="1"
		/>

		<!-- Diagonal line -->
		<line
			x1={config.padding}
			y1={config.height - config.padding}
			x2={config.width - config.padding}
			y2={config.padding}
			class="stroke-muted-foreground/20"
			stroke-width="1"
		/>

		<!-- Bezier curve -->
		<path
			d="M{config.padding},{config.height - config.padding} C{config.padding +
				easing.points[0] * config.plotSize},{config.height -
				config.padding -
				easing.points[1] * config.plotSize} {config.padding +
				easing.points[2] * config.plotSize},{config.height -
				config.padding -
				easing.points[3] * config.plotSize} {config.padding + config.plotSize},{config.height -
				config.padding -
				config.plotSize}"
			fill="none"
			class="stroke-muted-foreground"
			stroke-width="2"
		/>

		<!-- Start point  -->
		<circle
			cx={config.padding}
			cy={config.height - config.padding}
			r="4"
			class="fill-muted-foreground"
		/>

		<!-- End point -->
		<circle
			cx={config.width - config.padding}
			cy={config.padding}
			r="4"
			class="fill-muted-foreground"
		/>

		<!-- Animated circle -->
		<g class="animated-circle" style={getCircleAnimationStyle(easing, duration, pauseDuration)}>
			<circle
				cx={config.padding}
				cy={config.height - config.padding}
				r="4"
				class="fill-primary"
				style="
					animation-name: moveCircleHorizontally;
					animation-duration: calc(var(--animation-duration) * 1s);
					animation-timing-function: linear;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-delay: 0s
				"
			/>
		</g>
	</svg>
{/snippet}

{#snippet animatedSquare({
	easing,
	animationType
}: {
	easing: Easing;
	duration: number;
	animationType: AnimationType;
	pauseDuration: number;
})}
	<div
		class="pointer-events-none flex w-full items-center {animationType === 'translate'
			? 'justify-start'
			: 'justify-center'}"
		style={animationType === 'translate' ? getAnimationStyle(easing) : undefined}
	>
		<div
			class="animated-square h-10 w-10 rounded-lg bg-gradient-to-tr from-primary to-primary/80 shadow-lg shadow-primary/10"
			style={animationType !== 'translate' ? getAnimationStyle(easing) : undefined}
		></div>
	</div>
{/snippet}

<div class="_wrap mb-12 space-y-6">
	<div class="top-0 z-10 bg-background/95 py-4 backdrop-blur-lg md:sticky">
		<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
			<div class="flex flex-col gap-2">
				<Label for="duration">Duration</Label>
				<div class="flex items-center gap-4">
					<Slider
						value={[tempDuration]}
						min={0}
						max={5000}
						step={1}
						onValueChange={handleSliderChange}
						onValueCommit={handleSliderChangeEnd}
						class="w-[180px]"
					/>
					<Input
						type="number"
						value={tempDuration}
						oninput={handleInputChange}
						onblur={handleInputBlur}
						class="w-[90px]"
						min={0}
						max={5000}
					/>
					<span class="text-sm text-muted-foreground">ms</span>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<div class="flex flex-col gap-2">
					<Label>Filter</Label>
					<Select.Root
						type="single"
						bind:value={easingFilter}
						items={EASING_FILTERS}
						allowDeselect={false}
					>
						<Select.Trigger class="h-9 w-[100px]">
							{selectedEasingsFilterLabel}
						</Select.Trigger>
						<Select.Content>
							{#each EASING_FILTERS as filter}
								<Select.Item value={filter.value}>{filter.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-2">
					<Label>Animation type</Label>
					<Select.Root
						type="single"
						bind:value={animationType}
						items={ANIMATION_TYPES}
						allowDeselect={false}
					>
						<Select.Trigger class="h-9 w-[180px]">
							{selectedAnimationTypeLabel}
						</Select.Trigger>
						<Select.Content>
							{#each ANIMATION_TYPES as type}
								<Select.Item value={type.value}>{type.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
	</div>

	<div
		id="grid"
		class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>*:last-child:nth-child(2n-1)]:sm:col-span-2 [&>*:last-child:nth-child(3n-1)]:lg:col-start-2 [&>*:last-child:nth-child(3n-2)]:lg:col-span-3"
	>
		{#each getFilteredEasings() as easing (easing.name)}
			{#key `${easing.name}-${easingFilter}`}
				<div
					class="group relative flex aspect-square flex-col items-center justify-center gap-4 rounded-xl bg-muted/65"
				>
					<div class="pt-6 text-center text-sm font-medium">
						{easing.name}
					</div>

					<!-- SVG Component -->
					<div class="flex w-full grow flex-col items-start justify-center px-8">
						<div class="mb-4 flex w-full justify-center">
							{#key rerenderKey}
								{@render easingSvg({
									easing,
									config: defaultConfig,
									duration: duration / 1000,
									pauseDuration: pauseDuration / 1000
								})}
							{/key}
						</div>

						{#key rerenderKey}
							{@render animatedSquare({
								easing,
								duration: duration / 1000,
								animationType,
								pauseDuration: pauseDuration / 1000
							})}
						{/key}
					</div>

					<div class="flex items-center justify-center gap-2 pb-5">
						<CopyClass
							value={`[transition-timing-function:cubic-bezier(${easing.points.join(',')})]`}
						/>
					</div>
				</div>
			{/key}
		{/each}
		<div class="relative rounded-xl bg-muted/65 p-6">
			<p class="mb-4">
				<strong class="block text-sm font-medium text-foreground">Note</strong>
			</p>
			<p class="text-sm leading-relaxed text-muted-foreground">
				We use class names with arbitrary properties like
				<code class="font-mono text-[13px] text-foreground">
					&#91;transition-timing-function:cubic-bezier(...)&#93;
				</code>
				instead of
				<code class="font-mono text-[13px] text-foreground">ease-&#91;cubic-bezier(...)&#93;</code>
				as recommended in the Tailwind CSS documentation, because the latter won't work with the tailwindcss-animate
				plugin. See
				<a
					href="https://github.com/jamiebuilds/tailwindcss-animate/pull/46"
					class="underline hover:no-underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					this GitHub issue
				</a>
				for technical details.
			</p>
		</div>
	</div>
</div>

<style>
	@keyframes -global-translateSquare {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(100% - 2.5rem));
		}
	}
	@keyframes -global-scaleSquare {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes -global-rotateSquare {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes -global-moveCircleHorizontally {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(var(--plot-size));
		}
	}
	@keyframes -global-moveCircleVertically {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(calc(-1 * var(--plot-size)));
		}
	}

	._wrap :global(.group),
	._wrap :global(.animated-circle),
	._wrap :global(.animated-square) {
		transition: opacity 0.25s ease;
	}

	@media (min-width: 768px) {
		#grid:hover .group {
			opacity: 0.5;
		}
		#grid:hover .group :global(.animated-circle),
		#grid:hover .group :global(.animated-square) {
			opacity: 0;
		}
		#grid .group:hover,
		#grid .group:hover :global(.animated-circle),
		#grid .group:hover :global(.animated-square) {
			opacity: 1;
		}
	}
</style>
