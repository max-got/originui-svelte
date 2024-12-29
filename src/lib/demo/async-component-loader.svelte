<script lang="ts">
	import type { OUIComponent, OUIDirectory } from '$lib/componentRegistry.types';
	import type { WithElementRef } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import ShieldX from 'lucide-svelte/icons/shield-x';
	import { useIntersectionObserver, type UseIntersectionObserverOptions } from 'runed';

	type AsyncComponentLoaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		child: Snippet<[{ Component: Component }]>;
		componentId: OUIComponent;
		directory: OUIDirectory;
		error?: Snippet<[{ error: Error }]>;
		intersectionObserverOptions?: UseIntersectionObserverOptions;
		loadEagerly?: boolean;
		loading?: Snippet<[{ loading: boolean }]>;
		onComponentError?: (error: Error) => void;
		onComponentLoad?: () => void;
		onComponentLoaded?: (component: Component) => void;
	};

	let {
		child,
		class: className,
		componentId,
		directory,
		error,
		intersectionObserverOptions = { root: null, threshold: 0.9 },
		loadEagerly = false,
		loading,
		onComponentError,
		onComponentLoad,
		onComponentLoaded,
		ref = $bindable(null),
		...restProps
	}: AsyncComponentLoaderProps = $props();

	async function loadComponent(): Promise<{ default: Component }> {
		onComponentLoad?.();
		return import(`$lib/components/${directory}/${componentId}.svelte`)
			.then((module) => {
				onComponentLoaded?.(module.default);
				return module;
			})
			.catch((err) => {
				onComponentError?.(err);
				throw err;
			});
	}

	let componentPromise = $state(loadEagerly ? loadComponent() : null);
	let isIntersecting = $state(loadEagerly ? true : false);

	const _observer = loadEagerly
		? null
		: useIntersectionObserver(
				() => ref,
				([entry], observer) => {
					if (!entry) return;
					isIntersecting = entry.isIntersecting;
					if (isIntersecting && !componentPromise) {
						observer.unobserve(entry.target);
						componentPromise = loadComponent();
					}
				},
				intersectionObserverOptions
			);
</script>

{#snippet defaultLoading()}
	<div class="flex items-center justify-center">
		<div class="loader"></div>
	</div>
{/snippet}

{#snippet defaultError(error: Error)}
	<div class="flex flex-col items-center gap-2">
		<div class="flex items-center gap-2 text-muted-foreground">
			<p class="text-sm font-medium">Error</p>
			<ShieldX aria-hidden="true" />
		</div>
		<p class="text-sm text-muted-foreground">{error.message}</p>
	</div>
{/snippet}

<div bind:this={ref} class={cn(className)} {...restProps}>
	{#if isIntersecting && componentPromise}
		{#await componentPromise}
			{#if loading}
				{@render loading({ loading: true })}
			{:else}
				{@render defaultLoading()}
			{/if}
		{:then data}
			{@render child({ Component: data.default })}
		{:catch e}
			{#if error}
				{@render error({ error: e })}
			{:else}
				{@render defaultError(e)}
			{/if}
		{/await}
	{/if}
</div>

<style>
	.loader {
		width: 50px;
		aspect-ratio: 1;
		display: grid;
		border: 4px solid transparent;
		border-radius: 50%;
		border-right-color: theme('colors.svelte/40%');
		animation: spin 1.4s infinite linear;
	}
	.loader::before,
	.loader::after {
		content: '';
		grid-area: 1/1;
		margin: 2px;
		border: inherit;
		border-radius: 50%;
		animation: spin 1.8s infinite;
	}
	.loader::after {
		margin: 8px;
		animation-duration: 3s;
	}
	@keyframes spin {
		100% {
			transform: rotate(1turn);
		}
	}
</style>
