<script lang="ts">
	import { ScrollArea, Scrollbar } from '$lib/components/ui/scroll-area';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Box from 'lucide-svelte/icons/box';
	import House from 'lucide-svelte/icons/house';
	import PanelsTopLeft from 'lucide-svelte/icons/panels-top-left';
</script>

<Tabs value="tab-1">
	<ScrollArea>
		<TabsList
			class="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
		>
			<TabsTrigger
				value="tab-1"
				class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
			>
				<House class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Overview
			</TabsTrigger>
			<TabsTrigger
				value="tab-2"
				class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
			>
				<PanelsTopLeft
					class="-ms-0.5 me-1.5 opacity-60"
					size={16}
					stroke-width={2}
					aria-hidden="true"
				/>
				Repositories
			</TabsTrigger>
			<TabsTrigger
				value="tab-3"
				class="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
			>
				<Box class="-ms-0.5 me-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Packages
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
