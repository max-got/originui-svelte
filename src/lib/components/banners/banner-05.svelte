<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Eclipse from '@lucide/svelte/icons/eclipse';
	import X from '@lucide/svelte/icons/x';

	let visible = $state(true);
</script>

{#if visible}
	<div class="dark bg-muted px-4 py-3 text-foreground">
		<div class="flex gap-2">
			<div class="flex grow gap-3">
				<Eclipse class="mt-0.5 shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
				<div class="flex grow flex-col justify-between gap-2 md:flex-row">
					<p class="text-sm">
						We just added something awesome to make your experience even better.
					</p>
					<a href="#title" class="group whitespace-nowrap text-sm font-medium">
						Learn more<ArrowRight
							class="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
							size={16}
							strokeWidth={2}
							aria-hidden="true"
						/>
					</a>
				</div>
			</div>
			<Button
				variant="ghost"
				class="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
				onclick={() => (visible = false)}
				aria-label="Close banner"
			>
				<X
					size={16}
					strokeWidth={2}
					class="opacity-60 transition-opacity group-hover:opacity-100"
					aria-hidden="true"
				/>
			</Button>
		</div>
	</div>
{/if}
