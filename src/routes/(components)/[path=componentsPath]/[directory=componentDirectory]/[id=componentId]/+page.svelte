<script lang="ts">
	import type { PageData } from './$types';

	import * as Preview from '$lib/demo/preview-component/index.svelte.js';

	let { data }: { data: PageData } = $props();
</script>

<Preview.Component
	componentMetadata={data.component}
	nextComponentMetadata={data.nextComponentMetadata}
	prevComponentMetadata={data.prevComponentMetadata}
	isPreview={false}
/>
