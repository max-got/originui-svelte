<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
</script>

<Tabs value="tab-1" orientation="vertical" class="w-full flex-row">
	<TabsList class="flex-col rounded-none border-l border-border bg-transparent p-0">
		<TabsTrigger
			value="tab-1"
			class="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			Overview
		</TabsTrigger>
		<TabsTrigger
			value="tab-2"
			class="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			Repositories
		</TabsTrigger>
		<TabsTrigger
			value="tab-3"
			class="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
		>
			Packages
		</TabsTrigger>
	</TabsList>
	<div class="flex-grow rounded-lg border border-border text-start">
		<TabsContent value="tab-1">
			<p class="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 1</p>
		</TabsContent>
		<TabsContent value="tab-2">
			<p class="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 2</p>
		</TabsContent>
		<TabsContent value="tab-3">
			<p class="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 3</p>
		</TabsContent>
	</div>
</Tabs>
