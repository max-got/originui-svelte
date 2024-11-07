<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';
</script>

<div class="space-y-2">
	<Label for="textarea-11">Textarea with right button</Label>
	<Textarea id="textarea-11" placeholder="Leave a comment" />
	<div class="flex justify-end">
		<Button variant="outline">Send</Button>
	</div>
</div>
