<script lang="ts">
	import InfoIcon from '@lucide/svelte/icons/info';
	import XIcon from '@lucide/svelte/icons/x';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<!-- To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element. -->
<div
	class="border-border bg-background z-100 max-w-100 rounded-lg border px-4 py-3 shadow-lg shadow-black/5"
>
	<div class="flex gap-2">
		<p class="grow text-sm">
			<InfoIcon class="me-3 -mt-0.5 inline-flex text-blue-500" size={16} aria-hidden="true" />Just a
			quick note!
		</p>
		<Button
			variant="ghost"
			class="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
			aria-label="Close notification"
		>
			<XIcon
				size={16}
				class="opacity-60 transition-opacity group-hover:opacity-100"
				aria-hidden="true"
			/>
		</Button>
	</div>
</div>
