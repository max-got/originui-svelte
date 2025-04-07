<script lang="ts">
	import type { LayoutData } from './$types';

	import type { Snippet } from 'svelte';

	import Footer from '$lib/demo/layout/footer.svelte';

	import '../app.css';

	import Header from '$lib/demo/layout/header.svelte';

	import interVariableWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
	import { page } from '$app/state';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
	<link
		rel="preload"
		href={interVariableWoff2}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<ModeWatcher defaultMode="system" />

<div
	class="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6"
	data-vaul-drawer-wrapper
	data-home={page.url.pathname === '/'}
>
	<div
		class="relative mx-auto w-full max-w-6xl before:absolute before:inset-y-0 before:-left-12 before:w-px before:bg-[linear-gradient(to_bottom,theme(colors.svelte/.3),theme(colors.border)_200px,theme(colors.border)_calc(100%-200px),theme(colors.svelte/.3))] after:absolute after:inset-y-0 after:-right-12 after:w-px after:bg-[linear-gradient(to_bottom,theme(colors.svelte/.3),theme(colors.border)_200px,theme(colors.border)_calc(100%-200px),theme(colors.svelte/.3))]"
	>
		<div class="relative flex min-h-screen flex-col">
			<Header />
			{@render children()}
			<Footer footerLinks={data.footerLinks} />
		</div>
	</div>
</div>
