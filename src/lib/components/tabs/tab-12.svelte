<script lang="ts">
	import Badge from '$lib/components/ui/badge.svelte';

	import Box from '@lucide/svelte/icons/box';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import House from '@lucide/svelte/icons/house';
	import PanelsTopLeft from '@lucide/svelte/icons/panels-top-left';
	import Settings from '@lucide/svelte/icons/settings';
	import UsersRound from '@lucide/svelte/icons/users-round';
	import { ScrollArea, Scrollbar } from '$lib/components/ui/scroll-area';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
</script>

<Tabs value="tab-1">
	<ScrollArea>
		<TabsList
			class="mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 text-foreground"
		>
			<TabsTrigger
				value="tab-1"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<House class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Overview
			</TabsTrigger>
			<TabsTrigger
				value="tab-2"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<PanelsTopLeft
					class="-ms-0.5 me-1.5 opacity-60"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				Repositories
				<Badge class="ms-1.5 min-w-5 bg-primary/15 px-1" variant="secondary">3</Badge>
			</TabsTrigger>
			<TabsTrigger
				value="tab-3"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<Box class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Packages
				<Badge class="ms-1.5">New</Badge>
			</TabsTrigger>
			<TabsTrigger
				value="tab-4"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<UsersRound
					class="-ms-0.5 me-1.5 opacity-60"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				Team
			</TabsTrigger>
			<TabsTrigger
				value="tab-5"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<ChartLine
					class="-ms-0.5 me-1.5 opacity-60"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				Insights
			</TabsTrigger>
			<TabsTrigger
				value="tab-6"
				class="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
			>
				<Settings class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Settings
			</TabsTrigger>
		</TabsList>
		<Scrollbar orientation="horizontal" />
	</ScrollArea>
	<TabsContent value="tab-1">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 1</p>
	</TabsContent>
	<TabsContent value="tab-2">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 2</p>
	</TabsContent>
	<TabsContent value="tab-3">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 3</p>
	</TabsContent>
	<TabsContent value="tab-4">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 4</p>
	</TabsContent>
	<TabsContent value="tab-5">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 5</p>
	</TabsContent>
	<TabsContent value="tab-6">
		<p class="pt-1 text-center text-xs text-muted-foreground">Content for Tab 6</p>
	</TabsContent>
</Tabs>
