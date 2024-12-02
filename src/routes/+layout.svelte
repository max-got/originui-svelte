<script lang="ts">
	import Header from '$lib/demo/header.svelte';

	import interVariableWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';

	import '../app.css';

	import { ModeWatcher } from 'mode-watcher';

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
	class="relative z-0 flex min-h-screen flex-col overflow-hidden !bg-background supports-[overflow:clip]:overflow-clip"
	data-vaul-drawer-wrapper
>
	<Header />
	{@render children()}
</div>
