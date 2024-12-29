<script lang="ts">
	import type { AvailableComponentMetadata } from '$data/api/components.handler';

	import AsyncComponentLoader from '../async-component-loader.svelte';
	import PreviewComponentDependency from './preview-component-dependency.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import CodePreview from '$lib/demo/code-preview.svelte';
	import CopyButton from '$lib/demo/copy-button.svelte';

	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { clickOutside } from '$lib/actions/clickOutside';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import Code from 'lucide-svelte/icons/code';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Share from 'lucide-svelte/icons/share-2';
	import KbdLeft from 'lucide-svelte/icons/square-arrow-left';
	import KbdRight from 'lucide-svelte/icons/square-arrow-right';

	const overviewUrl = $derived($page.url.pathname.split('/').slice(0, -1).join('/'));

	type Props = {
		componentMetadata: AvailableComponentMetadata;
		isPreview?: boolean;
		nextComponentMetadata?: AvailableComponentMetadata | false;
		prevComponentMetadata?: AvailableComponentMetadata | false;
	};
	let {
		componentMetadata,
		isPreview = true,
		nextComponentMetadata,
		prevComponentMetadata
	}: Props = $props();

	const hasDependencies = $derived(componentMetadata.componentDependencies.list.length > 0);

	async function shareComponent() {
		const shareData = {
			text: `Check out the ${componentMetadata.id} component from Origin UI - Svelte`,
			title: `Origin UI - Svelte - ${componentMetadata.id}`,
			url: $page.url.href
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
			}
		} catch (err) {
			console.error('Error sharing:', err);
		}
	}

	let componentLoaded = $state(false);
	let showComponentPaginationNav = $state(false);

	// Add keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (!componentLoaded || $navigating) return;
		if (e.key === 'ArrowLeft' && prevComponentMetadata) {
			goto(`${overviewUrl}/${prevComponentMetadata.id}`);
		} else if (e.key === 'ArrowRight' && nextComponentMetadata) {
			goto(`${overviewUrl}/${nextComponentMetadata.id}`);
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

{#snippet paginationComponent(
	componentMetadata: AvailableComponentMetadata,
	direction: 'next' | 'prev'
)}
	<li class="group/link flex min-h-[200px] flex-col gap-2">
		<Button
			href="{overviewUrl}/{componentMetadata.id}"
			class="group {direction === 'prev' ? 'self-start' : 'self-end'}"
			variant="ghost"
			size="sm"
			aria-label="{direction === 'prev' ? 'Previous' : 'Next'} component: {componentMetadata.id}"
		>
			<kbd class="inline-flex items-center gap-2">
				{#if direction === 'prev'}
					<KbdLeft size={16} />
					<span class="hidden md:inline">Previous</span>
				{:else}
					<KbdRight size={16} />
					<span class="hidden md:inline">Next</span>
				{/if}
			</kbd>
			<span class="sr-only"
				>{direction === 'prev' ? 'Previous' : 'Next'} component: {componentMetadata.id}</span
			>
		</Button>
		<a
			class="inline-flex flex-1"
			href="{overviewUrl}/{componentMetadata.id}"
			aria-label="{direction === 'prev' ? 'Previous' : 'Next'} component: {componentMetadata.id}"
		>
			<div
				class="relative w-full content-center overflow-hidden rounded-md border border-input/50 bg-card shadow-sm transition-all duration-200 hover:border-input hover:shadow-md"
			>
				<div
					class="mx-auto flex max-w-fit scale-75 items-center justify-center overflow-hidden transition-transform duration-200"
				>
					<AsyncComponentLoader
						loadEagerly
						componentId={componentMetadata.id}
						directory={componentMetadata.directory}
						onComponentLoaded={() => (componentLoaded = true)}
						onComponentLoad={() => (componentLoaded = false)}
						onComponentError={() => (componentLoaded = false)}
					>
						{#snippet child({ Component })}
							<div inert class="[&_*]:!pointer-events-none [&_*]:!select-none">
								<Component />
							</div>
						{/snippet}
					</AsyncComponentLoader>
				</div>
			</div>
		</a>
	</li>
{/snippet}

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
	<header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-col gap-1">
			<div class="flex items-center gap-2">
				<h1 id="title" class="text-2xl font-bold">{componentMetadata.id}</h1>
				<Button class="gap-2" variant="ghost" size="icon" onclick={shareComponent}>
					<Share size={16} aria-hidden />
				</Button>
			</div>
			<p class="text-sm text-muted-foreground">{componentMetadata.path}</p>
		</div>
		<div class="flex items-center gap-2">
			<Button
				class="gap-2"
				variant="secondary"
				size="sm"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/max-got/originui-svelte/tree/main{componentMetadata.path}"
			>
				Component Source
				<Code size={16} aria-hidden />
			</Button>
			{#if isPreview}
				<Button
					class="gap-2"
					variant="secondary"
					size="sm"
					target="_blank"
					rel="noopener noreferrer"
					href="{$page.url.href}/{componentMetadata.directory}/{componentMetadata.id}"
				>
					Go to Component
					<ExternalLink size={16} aria-hidden />
				</Button>
			{/if}
		</div>
	</header>

	<section class="flex flex-col gap-8">
		<div class="flex flex-col gap-4">
			<!-- Preview Section -->
			<div class="flex flex-col gap-2">
				<h2 class="font-semibold">Preview</h2>
				<div
					class="z-0 flex min-h-[300px] items-center justify-center overflow-auto rounded-lg border border-muted bg-background p-4 shadow-sm"
				>
					{#key componentMetadata}
						<AsyncComponentLoader
							data-component-preview
							class="relative size-auto max-w-[350px] md:max-w-[500px] lg:max-w-[700px]"
							componentId={componentMetadata.id}
							directory={componentMetadata.directory}
						>
							{#snippet child({ Component })}
								<Component />
							{/snippet}
						</AsyncComponentLoader>
					{/key}
				</div>
			</div>
		</div>

		<!-- Code Section -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center">
				<h2 class=" font-semibold">Code</h2>
			</div>
			<div class="relative grid rounded-lg border border-muted" data-vaul-no-drag>
				<CodePreview code={componentMetadata.code.highlighted.content} />
				<div class="absolute right-1 top-1">
					<CopyButton code={componentMetadata.code.highlighted.content} />
				</div>
			</div>
		</div>

		<!-- Dependencies Section -->
		<div class="flex flex-col gap-2">
			<div class="flex items-center">
				<h2
					class="font-semibold data-[has-dependencies=false]:text-muted-foreground data-[has-dependencies=false]:line-through"
					data-has-dependencies={hasDependencies ? 'true' : 'false'}
				>
					Dependencies
				</h2>
			</div>

			{#if hasDependencies}
				<div class="grid h-full gap-4 lg:grid-cols-2">
					<div class="flex flex-col gap-2">
						<h3 class="text-sm font-semibold">Command</h3>
						<div
							class="relative flex h-full items-center justify-center rounded-lg border border-muted bg-background px-2 py-4 shadow-sm"
						>
							<div class="grid items-center gap-4" data-vaul-no-drag>
								<CodePreview
									code={componentMetadata.componentDependencies.command.highlighted.content}
								/>
							</div>
							<div class="absolute right-1 top-1">
								<CopyButton code={componentMetadata.componentDependencies.command.raw.content} />
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<h3 class="text-sm font-semibold">Packages</h3>
						<div
							class="flex h-full max-h-[400px] items-center justify-center rounded-lg border border-muted bg-background px-2 py-4 shadow-sm"
						>
							<div class="grid place-items-start gap-4 lg:grid-cols-2">
								{#each componentMetadata.componentDependencies.list as dependency (dependency.packageName)}
									<PreviewComponentDependency {dependency} class="w-full" />
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>

{#if prevComponentMetadata || nextComponentMetadata}
	<div
		class="group/wrapper fixed bottom-[env(safe-area-inset-bottom)] left-0 isolate z-[calc(infinity)] w-full transition-opacity duration-200"
		role="complementary"
		aria-label="Component navigation"
		data-show-nav={showComponentPaginationNav ? 'true' : 'false'}
		use:clickOutside
		onclickoutside={() => (showComponentPaginationNav = false)}
	>
		<div class="relative isolate mx-auto max-w-screen-lg px-4">
			<nav
				id="component-nav"
				class="absolute bottom-0 left-0 z-0 w-full translate-y-full overflow-hidden rounded-lg border border-t border-border bg-background/95 p-4 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-data-[show-nav=true]/wrapper:-translate-y-[calc(0%+2rem)] group-data-[show-nav=true]/wrapper:opacity-100 md:rounded-xl md:p-6"
				aria-hidden={showComponentPaginationNav ? 'false' : 'true'}
			>
				<ul class="grid grid-cols-2 place-items-stretch gap-12">
					{#key prevComponentMetadata}
						{#if prevComponentMetadata}
							{@render paginationComponent(prevComponentMetadata, 'prev')}
						{/if}
					{/key}

					{#key nextComponentMetadata}
						{#if nextComponentMetadata}
							{@render paginationComponent(nextComponentMetadata, 'next')}
						{/if}
					{/key}
				</ul>
			</nav>

			<div
				class="z-50 h-[2rem] translate-y-5 rounded-lg border border-t border-border bg-background/95 backdrop-blur-sm transition-all duration-300 ease-out hover:translate-y-0 hover:shadow-lg group-data-[show-nav=true]/wrapper:translate-y-0 group-data-[show-nav=true]/wrapper:rounded-t-none"
			>
				<Button
					class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-5 transition-transform hover:scale-105"
					onclick={() => (showComponentPaginationNav = !showComponentPaginationNav)}
					variant="outline"
					size="icon"
					aria-expanded={showComponentPaginationNav}
					aria-controls="component-nav"
				>
					<ChevronUp
						size={16}
						aria-hidden
						class="transition-transform duration-200 group-data-[show-nav=true]/wrapper:rotate-180"
					/>
					<span class="sr-only"
						>{showComponentPaginationNav ? 'Hide' : 'Show'} component navigation</span
					>
				</Button>
			</div>
		</div>
	</div>
{/if}
