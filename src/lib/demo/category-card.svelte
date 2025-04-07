<script lang="ts">
	import type { EnhancedImgAttributes } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';

	type CategoryCardProps = {
		alt: string;
		details: Snippet;
		slug: string;
	};
	let { alt, details, slug }: CategoryCardProps = $props();

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

	const imageBasePath = $derived(getImage(slug));
</script>

<div class="flex flex-col items-center justify-center space-y-3 text-center">
	<a
		href="/{slug}"
		class="dark:outline-svelte-700/80 group peer relative grid place-items-center overflow-hidden rounded-xl outline outline-[0.5px] outline-svelte/40 sm:flex"
		tabIndex={-1}
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

		<span class="sr-only">{alt}</span>
		<div
			class="absolute inset-0 bg-svelte/60 mix-blend-overlay transition-colors group-hover:bg-svelte/80"
		></div>
	</a>

	<div class="mb-0.5 peer-hover:[&_a]:underline">
		{@render details()}
	</div>
</div>
