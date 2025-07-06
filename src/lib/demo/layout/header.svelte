<script lang="ts">
	import ThemeToggle from '$lib/demo/theme-toggle.svelte';

	import LucideSearch from '@lucide/svelte/icons/search';
	import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
	import { page } from '$app/state';
</script>

<header
	class="before:bg-[linear-gradient(to_right,--theme(--color-svelte/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-svelte/.3))] relative mb-14 before:absolute before:-inset-x-32 before:bottom-0 before:h-px"
>
	<div
		class="before:bg-svelte after:bg-svelte before:absolute before:-bottom-px before:-left-12 before:z-10 before:-ml-px before:size-[3px] after:absolute after:-right-12 after:-bottom-px after:z-10 after:-mr-px after:size-[3px]"
		aria-hidden="true"
	></div>
	<div class="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-3">
		<a href="/" aria-label="Home" class="flex items-center gap-2">
			<span class="sr-only">Origin UI - Svelte</span>
			<svg
				class="stroke-svelte size-8"
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 32 32"
				aria-hidden="true"
			>
				<circle cx="16" cy="16" r="13" fill="none" stroke-width="2" />
				<circle cx="16" cy="16" r="9" fill="none" stroke-width="2" />
			</svg>
		</a>
		<nav>
			<ul class="flex items-center justify-center gap-4">
				<li>
					<a
						href="/search/llms"
						class={[
							'group transition-colors duration-200',
							'inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:underline',
							'dark:aria-[current]:bg-svelte/30 aria-[current]:bg-svelte/15 aria-[current]:underline',
							'dark:aria-[current]:text-[color-mix(in_srgb,var(--color-svelte),var(--color-white)_70%)]',
							'aria-[current]:text-[color-mix(in_srgb,var(--color-svelte),var(--color-black)_10%)]'
						]}
						aria-current={page.url.pathname === '/search/llms' ? 'page' : undefined}
						aria-label="Search LLMs.txt directory"
					>
						llms.txt
						<LucideSearch
							class={[
								'text-muted-foreground/80 size-4',
								'dark:group-aria-[current]:text-[color-mix(in_srgb,var(--color-svelte),var(--color-white)_30%)]',
								'group-aria-[current]:text-[color-mix(in_srgb,var(--color-svelte),var(--color-black)_10%)]',
								'dark:text-white/60'
							]}
							aria-hidden="true"
						/>
					</a>
				</li>
				<li>
					<a
						href="https://github.com/max-got/originui-svelte"
						target="_blank"
						class="inline-flex gap-1 rounded-md px-2 py-1 text-sm hover:underline"
						rel="noopener noreferrer"
					>
						GitHub
						<RiArrowRightUpLine class="text-muted-foreground/80" aria-hidden="true" />
					</a>
				</li>
				<li>
					<ThemeToggle />
				</li>
			</ul>
		</nav>
	</div>
</header>
