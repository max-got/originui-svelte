<script lang="ts">
	import Cta from '$lib/demo/cta.svelte';
	import {
		Dialog as PreviewDialog,
		setPreviewComponentDialogCtx
	} from '$lib/demo/preview-component/index.svelte';

	let { children } = $props();

	const previewComponentDialogCtx = setPreviewComponentDialogCtx({});
</script>

<main>
	<div class="px-4 sm:px-6">
		<div class="mx-auto w-full max-w-6xl">
			{@render children()}
		</div>
	</div>
	<Cta />
</main>
<PreviewDialog
	componentMetadata={previewComponentDialogCtx.componentMetadata}
	dialogOpen={previewComponentDialogCtx.dialogOpen}
	closeDialog={previewComponentDialogCtx.closeDialog}
/>
