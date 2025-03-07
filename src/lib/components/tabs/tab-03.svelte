<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
</script>

<Tabs value="tab-1" class="items-center">
	<TabsList class="gap-1 bg-transparent">
		<TabsTrigger
			value="tab-1"
			class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
		>
			Tab 1
		</TabsTrigger>
		<TabsTrigger
			value="tab-2"
			class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
		>
			Tab 2
		</TabsTrigger>
		<TabsTrigger
			value="tab-3"
			class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
		>
			Tab 3
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
