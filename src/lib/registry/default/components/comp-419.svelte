<script lang="ts">
	import Check from '@lucide/svelte/icons/check';

	import Badge from '$lib/components/ui/badge.svelte';
</script>

<Badge variant="outline" class="gap-1.5">
	<Check class="text-emerald-500" size={12} aria-hidden="true" />
	Badge
</Badge>
