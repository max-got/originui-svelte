<script lang="ts">
	import Illustration from '$lib/demo/illustration.svelte';

	import { COMPONENT_ROUTES } from '$lib/config/routes';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { mode } from 'mode-watcher';
</script>

<svelte:head>
	<title>Origin UI - Svelte | Beautiful UI components built with Tailwind CSS and Svelte</title>

	<meta name="theme-color" content={$mode === 'dark' ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)'} />
	<meta
		name="Description"
		content="An extensive collection of copy-and-paste Svelte components for quickly building app UIs."
	/>
	<meta name="keywords" content="svelte, component, origin ui, tailwindcss, ui, library" />

	<meta
		property="og:title"
		content="An extensive collection of copy-and-paste Svelte components for quickly building app UIs."
	/>
	<meta
		property="og:description"
		content="An extensive collection of copy-and-paste Svelte components for quickly building app UIs."
	/>
	<meta property="og:image:type" content="image/jpeg" /><meta
		property="og:image:width"
		content="2400"
	/>
	<meta property="og:image:height" content="1260" />
	<meta property="og:image" content="/og-image.jpg" />

	<meta name="twitter:title" content="Origin UI - Svelte" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:description"
		content="An extensive collection of copy-and-paste Svelte components for quickly building app UIs."
	/>
	<meta name="twitter:image:type" content="image/jpeg" />
	<meta name="twitter:image:width" content="2400" />
	<meta name="twitter:image:height" content="1260" />
	<meta name="twitter:image" content="/twitter-image.jpg" />
</svelte:head>

<Illustration />

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-3xl">
			<div class="my-16">
				<h1
					class="mx-auto mb-4 max-w-3xl text-4xl/[1.1] font-extrabold tracking-tight text-foreground md:text-5xl/[1.1]"
				>
					Beautiful UI components built with Tailwind CSS and
					<span class="text-svelte"> Svelte </span>
				</h1>
				<p class="mb-4 text-lg text-muted-foreground">
					Origin UI - Svelte is an extensive collection of copy-and-paste components for quickly
					building app UIs. It's free, open-source, and ready to drop into your projects.
				</p>
				<p
					class="w-fit max-w-prose text-pretty border-t border-border pt-4 text-sm text-accent-foreground"
				>
					This project is not affiliated with the original <a
						class="underline"
						href="https://originui.com/"
						rel="noreferrer">Origin UI</a
					>. <br />
					<span class="text-xs text-muted-foreground">
						I'm grateful for their work and have created these Svelte components copied from their
						design.
					</span>
				</p>
			</div>

			<div class="mb-16">
				<h2 class="mb-5 text-muted-foreground">Latest components</h2>
				<nav>
					<ul class="flex flex-col gap-2">
						{#each Object.values(COMPONENT_ROUTES).sort((a, b) => a.order - b.order) as route (route.path)}
							<li>
								<a
									href={route.path}
									class="inline-flex w-full items-center justify-between whitespace-nowrap rounded-lg border border-border bg-background p-4 font-bold shadow-sm shadow-black/[0.04] ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-14"
								>
									{route.header.title}
									<ArrowRight size={16} stroke-width={2} class="-mr-1 ml-2 opacity-60" />
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>
</main>
