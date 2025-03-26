<script lang="ts">
	import ThemeToggle from '$lib/demo/theme-toggle.svelte';

	import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
</script>

<header
	class="relative mb-14 before:absolute before:-inset-x-32 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,theme(colors.svelte/.3),theme(colors.border)_200px,theme(colors.border)_calc(100%-200px),theme(colors.svelte/.3))]"
>
	<div
		class="before:absolute before:-bottom-px before:-left-12 before:z-10 before:-ml-px before:size-[3px] before:bg-svelte after:absolute after:-bottom-px after:-right-12 after:z-10 after:-mr-px after:size-[3px] after:bg-svelte"
		aria-hidden="true"
	></div>
	<div class="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-3">
		<a href="/" aria-label="Home" class="flex items-center gap-2">
			<span class="sr-only">Origin UI - Svelte</span>
			<svg
				class="size-6 stroke-svelte"
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
			<ul class="flex items-center gap-4">
				<li>
					<a
						href="https://github.com/max-got/originui-svelte"
						target="_blank"
						class="inline-flex gap-0.5 text-sm hover:underline"
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
