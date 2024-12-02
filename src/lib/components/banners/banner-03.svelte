<script lang="ts">
	import Eclipse from 'lucide-svelte/icons/eclipse';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
</script>

<div class="dark bg-muted px-4 py-3 text-foreground">
	<div class="flex flex-col justify-between gap-2 md:flex-row">
		<div class="flex grow gap-3">
			<Eclipse class="mt-0.5 shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
			<div class="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
				<p class="text-sm">We just added something awesome to make your experience even better.</p>
				<a href="#" class="group whitespace-nowrap text-sm font-medium">
					Learn more<ArrowRight
						class="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
						size={16}
						strokeWidth={2}
						aria-hidden="true"
					/>
				</a>
			</div>
		</div>
	</div>
</div>
