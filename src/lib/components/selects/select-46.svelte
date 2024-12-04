<script module lang="ts">
	import type { Option } from '$lib/components/ui/multiple-select/multiple-select.svelte';
	const frameworks: Option[] = [
		{
			label: 'Next.js',
			value: 'next.js'
		},
		{
			label: 'SvelteKit',
			value: 'sveltekit'
		},
		{
			disable: true,
			label: 'Nuxt.js',
			value: 'nuxt.js'
		},
		{
			label: 'Remix',
			value: 'remix'
		},
		{
			label: 'Astro',
			value: 'astro'
		},
		{
			label: 'Angular',
			value: 'angular'
		},
		{
			label: 'Vue.js',
			value: 'vue'
		},
		{
			label: 'React',
			value: 'react'
		},
		{
			label: 'Ember.js',
			value: 'ember'
		},
		{
			label: 'Gatsby',
			value: 'gatsby'
		},
		{
			disable: true,
			label: 'Eleventy',
			value: 'eleventy'
		},
		{
			label: 'SolidJS',
			value: 'solid'
		},
		{
			label: 'Preact',
			value: 'preact'
		},
		{
			label: 'Qwik',
			value: 'qwik'
		},
		{
			label: 'Alpine.js',
			value: 'alpine'
		},
		{
			label: 'Lit',
			value: 'lit'
		}
	];
</script>

<script lang="ts">
	import Label from '../ui/label.svelte';

	import * as MultipleSelect from '$lib/components/ui/multiple-select';
</script>

<div class="space-y-2">
	<Label for="select-46">Multiselect</Label>
	<MultipleSelect.Root
		defaultOptions={frameworks}
		hideClearAllButton
		hidePlaceholderWhenSelected
		value={frameworks.slice(0, 2)}
		label="Select frameworks"
		placeholder="Select frameworks"
	>
		{#snippet emptyIndicator()}
			<p class="text-center text-sm">No results found</p>
		{/snippet}
		{#snippet loadingIndicator()}
			<p class="text-center text-sm">Loading...</p>
		{/snippet}
	</MultipleSelect.Root>
</div>
