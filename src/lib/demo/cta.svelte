<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<section class="relative isolate overflow-hidden border-t border-border">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
		<div class="relative">
			<div class="absolute left-32 top-0 size-28 rounded-full bg-svelte/15 blur-2xl"></div>
			<div class="absolute bottom-0 right-32 size-44 rounded-full bg-svelte/15 blur-2xl"></div>

			<div class="relative z-10 text-center">
				<h2
					class="font-heading mb-4 text-balance font-serif text-3xl/[1.1] tracking-tight text-foreground md:text-4xl/[1.1]"
				>
					<span class="block">Discover/Contribute</span>
				</h2>

				<p class="mx-auto max-w-xl text-balance text-base text-muted-foreground">
					Explore the original Origin UI or contribute by suggesting new components and
					improvements.
				</p>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
					<Button
						variant="secondary"
						href="https://github.com/max-got/originui-svelte/discussions"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Send a suggestion to the Origin UI - Svelte repository"
					>
						Visit Original
					</Button>
					<Button
						href="https://originui.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit the original Origin UI website"
					>
						Send Suggestion
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>
