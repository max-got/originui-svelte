<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import XIcon from '@lucide/svelte/icons/x';

	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<!-- To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element. -->
<div
	class="border-border bg-background z-100 max-w-100 rounded-lg border p-4 shadow-lg shadow-black/5"
>
	<div class="flex gap-2">
		<div class="flex grow gap-3">
			<CircleAlertIcon class="mt-0.5 shrink-0 text-red-500" size={16} aria-hidden="true" />
			<div class="flex grow flex-col gap-3">
				<div class="space-y-1">
					<p class="text-sm font-medium">We couldn&lsquo;t complete your request!</p>
					<p class="text-muted-foreground text-sm">
						It indicates that an issue has prevented the processing of the request.
					</p>
				</div>
				<div class="flex gap-2">
					<Button size="sm">Learn more</Button>
				</div>
			</div>
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
</div>
