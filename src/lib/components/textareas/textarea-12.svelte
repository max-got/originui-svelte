<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';
</script>

<div class="space-y-2">
	<Label for="textarea-12">Textarea with button</Label>
	<Textarea id="textarea-12" placeholder="Leave a comment" />
	<Button variant="outline" class="w-full">Send</Button>
</div>
