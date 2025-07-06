<script lang="ts">
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';
	import type { CategoryWithDetails } from '$lib/data/registry/query';

	import { cn } from '$lib/utils';
	type CategoryCardProps = {
		alt: string;
		category: CategoryWithDetails;
	};
	let { alt, category }: CategoryCardProps = $props();

	const images = import.meta.glob<EnhancedImgAttributes['src']>(['/src/lib/assets/thumbs/*.png'], {
		eager: true,
		import: 'default',
		query: { enhanced: true, w: '1280;640;400' }
	});

	function getImage(category: string) {
		const darkVersion = images[`/src/lib/assets/thumbs/${category}-dark.png`];
		const lightVersion = images[`/src/lib/assets/thumbs/${category}.png`];

		if (!darkVersion || !lightVersion) {
			throw new Error(`No image found for ${category}`);
		}

		return {
			dark: darkVersion,
			light: lightVersion
		};
	}

	const imageBasePath = $derived(getImage(category.slug));

	const isFullyImplemented = $derived(category.total - category.totalWithTodo === category.total);
</script>

{#snippet available()}
	<a
		href="/{category.slug}"
		class={cn(
			'group space-y-3 rounded-xl text-center',
			'focus-visible:outline-svelte/40 focus-visible:dark:outline-svelte/80 focus-visible:outline-2 focus-visible:outline-offset-2'
		)}
	>
		<div
			class={cn(
				'relative',
				'outline-svelte/40 relative overflow-hidden rounded-xl outline-[0.5px]'
			)}
		>
			<enhanced:img
				class="h-[198px] w-[268px] object-cover dark:hidden"
				src={imageBasePath.light}
				{alt}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>
			<enhanced:img
				class="hidden h-[198px] w-[268px] object-cover dark:block"
				src={imageBasePath.dark}
				{alt}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>

			<div
				class="bg-svelte/60 group-hover:bg-svelte/80 absolute inset-0 mix-blend-overlay transition-colors"
			></div>
		</div>

		<div>
			<h2 class="text-sm">
				{category.name}
			</h2>
			<p class="text-muted-foreground text-[13px]">
				{#if isFullyImplemented}
					{category.total} Components
				{:else}
					{category.total - category.totalWithTodo} / {category.total} Components
				{/if}
			</p>
		</div>
	</a>
{/snippet}

{#snippet unavailable()}
	<div class="group space-y-3 rounded-xl text-center">
		<div class="relative overflow-hidden rounded-xl outline-[0.5px]">
			<enhanced:img
				class="h-[198px] w-[268px] object-cover dark:hidden"
				src={imageBasePath.light}
				{alt}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>
			<enhanced:img
				class="hidden h-[198px] w-[268px] object-cover dark:block"
				src={imageBasePath.dark}
				{alt}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>

			<div
				class="absolute inset-0 bg-gray-500/60 mix-blend-overlay transition-colors group-hover:bg-gray-500/80"
			></div>
		</div>

		<div>
			<h2 class="text-sm">
				{category.name}
			</h2>
			<p class="text-muted-foreground text-[13px]">Coming soon ™</p>
		</div>
	</div>
{/snippet}

<div class="flex flex-col items-center justify-center space-y-3 text-center">
	{#if category.available === 'all' || category.available === 'partial'}
		{@render available()}
	{:else}
		{@render unavailable()}
	{/if}
</div>
