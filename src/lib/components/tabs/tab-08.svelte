<script lang="ts">
	import Badge from '$lib/components/ui/badge.svelte';

	import { ScrollArea, Scrollbar } from '$lib/components/ui/scroll-area';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Box from 'lucide-svelte/icons/box';
	import House from 'lucide-svelte/icons/house';
	import PanelsTopLeft from 'lucide-svelte/icons/panels-top-left';
</script>

<Tabs value="tab-1">
	<ScrollArea>
		<TabsList class="mb-3">
			<TabsTrigger value="tab-1">
				<House class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Overview
			</TabsTrigger>
			<TabsTrigger value="tab-2" class="group">
				<PanelsTopLeft
					class="-ms-0.5 me-1.5 opacity-60"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				Repositories
				<Badge
					class="ms-1.5 min-w-5 bg-primary/15 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
					variant="secondary"
				>
					3
				</Badge>
			</TabsTrigger>
			<TabsTrigger value="tab-3" class="group">
				<Box class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Packages
				<Badge class="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">New</Badge>
			</TabsTrigger>
		</TabsList>
		<Scrollbar orientation="horizontal" />
	</ScrollArea>
	<TabsContent value="tab-1">
		<p class="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 1</p>
	</TabsContent>
	<TabsContent value="tab-2">
		<p class="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 2</p>
	</TabsContent>
	<TabsContent value="tab-3">
		<p class="p-4 pt-1 text-center text-xs text-muted-foreground">Content for Tab 3</p>
	</TabsContent>
</Tabs>
