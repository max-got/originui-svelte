<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import ThemeToggle from '$lib/demo/theme-toggle.svelte';

	import SearchIcon from '@lucide/svelte/icons/search';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import RiArrowRightUpLine from '~icons/ri/arrow-right-up-line';
	import { page } from '$app/state';
	import {
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuList,
		NavigationMenuRoot
	} from '$lib/components/ui/navigation-menu';
	import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';

	const navigationLinks = [
		{
			active: page.url.pathname === '/search/llms',
			href: '/search/llms',
			icon: SparklesIcon,
			label: 'LLMs.txt'
		}
	];
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
				<Popover>
					<PopoverTrigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>
								Search
								<SearchIcon class={['text-muted-foreground/80 size-4']} aria-hidden="true" />
							</Button>
						{/snippet}
					</PopoverTrigger>
					<PopoverContent align="start" class="z-10 w-36 p-1 ">
						<NavigationMenuRoot class="max-w-none *:w-full">
							<NavigationMenuList class="flex-col items-start gap-0 md:gap-2">
								{#each navigationLinks as link (link.href)}
									<NavigationMenuItem class="w-full">
										<NavigationMenuLink
											href={link.href}
											class={[
												'group w-full flex-row items-center gap-2 py-1.5',
												'aria-[current]:bg-muted-foreground/10 '
											]}
											aria-current={page.url.pathname === link.href ? 'page' : undefined}
										>
											<link.icon
												class="text-muted-foreground/80 group-aria-[current]:text-svelte size-4"
												aria-hidden="true"
											/>
											{link.label}
										</NavigationMenuLink>
									</NavigationMenuItem>
								{/each}
							</NavigationMenuList>
						</NavigationMenuRoot>
					</PopoverContent>
				</Popover>

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
