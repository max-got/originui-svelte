<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
	import BadgeQuestionMarkIcon from '@lucide/svelte/icons/badge-question-mark';
	import InfoIcon from '@lucide/svelte/icons/info';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { mode } from 'mode-watcher';
	import { Debounced } from 'runed';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let { data } = $props();

	const componentLinks = $derived.by(() => {
		const llmsCategory = data.links.find((category) => category.title === 'llms.txt');
		return llmsCategory?.links || [];
	});

	// State for search
	let searchQuery = $state('');
	const debounced = new Debounced(() => searchQuery, 300);

	// Filter components based on search
	const filteredComponents = $derived.by(() => {
		if (!debounced.current.trim()) return componentLinks;

		return componentLinks.filter((component) =>
			component.label.toLowerCase().includes(debounced.current.toLowerCase())
		);
	});

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`,
				easing: quintOut
			};
		}
	});
</script>

<svelte:head>
	<title>LLMs.txt Search - Component Library AI Training Data | Origin UI Svelte</title>
	<meta
		name="theme-color"
		content={mode.current === 'dark' ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)'}
	/>
	<meta
		name="description"
		content="Browse and search LLMs.txt files from Origin UI Svelte component registry. Train AI assistants with consistent design patterns, component structure, and coding conventions."
	/>
	<meta
		name="keywords"
		content="llms.txt, ai training, component library, svelte, ai assistant, design patterns, tailwindcss"
	/>
	<meta property="og:title" content="LLMs.txt Search - Component Library AI Training Data" />
	<meta
		property="og:description"
		content="Browse and search LLMs.txt files from Origin UI Svelte component registry. Train AI assistants with consistent design patterns, component structure, and coding conventions."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="2400" />
	<meta property="og:image:height" content="1260" />
	<meta property="og:image" content="/og-image.jpg" />
	<meta name="twitter:title" content="LLMs.txt Search - Component Library AI Training Data" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:description"
		content="Browse and search LLMs.txt files from Origin UI Svelte component registry. Train AI assistants with consistent design patterns, component structure, and coding conventions."
	/>
	<meta name="twitter:image:type" content="image/jpeg" />
	<meta name="twitter:image:width" content="2400" />
	<meta name="twitter:image:height" content="1260" />
	<meta name="twitter:image" content="/twitter-image.jpg" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- INTRO SECTION -->
	<section class="mb-12">
		<!-- Page header -->
		<div class="mb-8 text-center">
			<h1
				class="text-foreground font-heading mb-4 text-3xl/[1.1] tracking-tight text-balance md:text-4xl/[1.1]"
			>
				LLMs.txt
			</h1>
			<p class="text-muted-foreground mx-auto max-w-2xl leading-relaxed">
				Browse and use LLMs.txt files generated from Origin UI Svelte registry. Feed these to your
				AI assistant to enable it to create new components with consistent styling, patterns, and
				best practices.
			</p>
		</div>

		<!-- Main LLMs.txt file -->
		<div class="mb-8">
			<div class="border-border bg-card rounded-lg border p-6">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-foreground flex items-center gap-2 font-sans text-lg font-semibold">
						Complete Documentation
					</h2>
					<span class="text-muted-foreground bg-muted rounded-full px-3 py-1 text-sm">
						All components
					</span>
				</div>
				<p class="text-muted-foreground mb-4 text-sm">
					The master LLMs.txt file containing documentation for all component types in our library.
				</p>
				<Button href="/llms.txt" target="_blank" rel="noopener noreferrer" variant="secondary">
					<ArrowUpRightIcon class="size-4" aria-hidden="true" />
					View llms.txt
				</Button>
			</div>
		</div>

		<!-- Usage instructions -->
		<div class="border-border bg-muted/30 rounded-lg border p-6">
			<h2 class="text-foreground mb-4 flex items-center gap-2 font-sans font-semibold">
				<BadgeQuestionMarkIcon class="text-muted-foreground size-4" aria-hidden="true" />
				How to Use with AI Assistants
			</h2>
			<p class="text-muted-foreground mb-4 text-sm">
				Copy any LLMs.txt URL below and provide it to your AI assistant. This will teach it our
				design patterns, component structure, and coding conventions for that specific component
				type.
			</p>
			<div
				class="text-muted-foreground bg-background/50 border-border flex items-start gap-3 rounded-md border p-4"
			>
				<InfoIcon class="mt-0.5 size-4 flex-shrink-0" aria-hidden="true" />
				<span class="text-sm leading-relaxed">
					<strong>Example:</strong> "Use this LLMs.txt to understand the button component patterns: [URL]"
				</span>
			</div>
		</div>
	</section>

	<!-- DIVIDER -->
	<div class="border-border mb-8 border-t"></div>

	<!-- SEARCH & BROWSE SECTION -->
	<section>
		<!-- Section header with search -->
		<div class="mb-8">
			<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-foreground mb-2 font-sans font-semibold">Browse Individual Components</h2>
					<p class="text-muted-foreground">
						Find specific component documentation for targeted AI training
					</p>
				</div>
				<span class="text-muted-foreground bg-muted rounded-full px-3 py-1 text-sm">
					{filteredComponents.length}
					{filteredComponents.length === 1 ? 'category' : 'categories'}
				</span>
			</div>

			<!-- Search bar -->
			<div class="relative max-w-md">
				<SearchIcon class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<input
					type="search"
					placeholder="Search component categories..."
					bind:value={searchQuery}
					class="border-border bg-background placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20 h-11 w-full rounded-md border pr-4 pl-10 text-sm focus:ring-2 focus:outline-none"
				/>
			</div>
		</div>

		<!-- Component grid -->
		<div class="border-border bg-background/50 h-[500px] overflow-hidden rounded-lg border">
			<div
				class="grid h-full place-content-baseline place-items-start gap-4 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			>
				{#each filteredComponents as component (component.href)}
					<a
						href={component.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={component['aria-label']}
						class="group bg-card hover:bg-card/80 border-border w-full rounded-lg border p-4 transition-all hover:shadow-sm"
						in:receive={{ key: component.href }}
						out:send={{ key: component.href }}
						animate:flip={{ duration: 200 }}
					>
						<div class="flex items-center gap-3">
							<div class="min-w-0 flex-1">
								<h3
									class="text-foreground group-hover:text-foreground/90 mb-1 truncate font-medium"
								>
									{component.label.replace('llms/', '')}
								</h3>
								<p class="text-muted-foreground text-xs">Component documentation</p>
							</div>
							<ArrowUpRightIcon
								class="text-muted-foreground size-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
								aria-hidden="true"
							/>
						</div>
					</a>
				{:else}
					<div class="flex flex-col col-span-full items-center justify-center py-16 text-center">
						<div class="bg-muted/50 mb-4 rounded-full p-4">
							<SearchIcon class="text-muted-foreground size-8" aria-hidden="true" />
						</div>
						<h3 class="text-foreground mb-2 text-lg font-semibold">No categories found</h3>
						<p class="text-muted-foreground text-sm">
							No categories found for "{searchQuery}".
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Back to home link -->
	<div class="mt-12 text-center">
		<Button href="/" variant="outline">
			<ArrowLeftIcon class="size-4" aria-hidden="true" />
			Back to home
		</Button>
	</div>
</div>
