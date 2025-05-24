<script lang="ts">
	import UserRound from '@lucide/svelte/icons/user-round';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
</script>

<Avatar>
	<AvatarFallback>
		<UserRound size={16} stroke-width={2} class="opacity-60" aria-hidden="true" />
	</AvatarFallback>
</Avatar>
