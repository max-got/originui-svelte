<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import Box from 'lucide-svelte/icons/box';
	import House from 'lucide-svelte/icons/house';
	import PanelsTopLeft from 'lucide-svelte/icons/panels-top-left';
</script>

<Tabs value="tab-1">
	<TabsList class="h-auto rounded-none border-b border-border bg-transparent p-0">
		<TabsTrigger
			value="tab-1"
			class="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			<House class="mb-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
			Overview
		</TabsTrigger>
		<TabsTrigger
			value="tab-2"
			class="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			<PanelsTopLeft class="mb-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
			Repositories
		</TabsTrigger>
		<TabsTrigger
			value="tab-3"
			class="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			<Box class="mb-1.5 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
			Packages
		</TabsTrigger>
	</TabsList>
	<TabsContent value="tab-1">
		<p class="p-4 text-center text-xs text-muted-foreground">Content for Tab 1</p>
	</TabsContent>
	<TabsContent value="tab-2">
		<p class="p-4 text-center text-xs text-muted-foreground">Content for Tab 2</p>
	</TabsContent>
	<TabsContent value="tab-3">
		<p class="p-4 text-center text-xs text-muted-foreground">Content for Tab 3</p>
	</TabsContent>
</Tabs>
