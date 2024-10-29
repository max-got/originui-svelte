<script lang="ts">
	import '../app.css';

	import interVariableWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';

	import Header from '$lib/demo/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Cta from '$lib/demo/cta.svelte';
	import { page } from '$app/stores';
	import Illustration from '$lib/demo/illustration.svelte';

	let { children } = $props();
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
	class="relative flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
>
	<Header />
	<Illustration />
	{@render children()}
	{#if $page.url.pathname !== '/'}
		<Cta />
	{/if}
</div>
