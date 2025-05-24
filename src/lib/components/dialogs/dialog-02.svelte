<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button.svelte';

	import CircleAlert from '@lucide/svelte/icons/circle-alert';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		Alert dialog with icon
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<div class="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
			<div
				class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<CircleAlert class="opacity-80" size={16} strokeWidth={2} />
			</div>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure you want to delete your account? All your data will be removed.
				</AlertDialog.Description>
			</AlertDialog.Header>
		</div>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Confirm</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
