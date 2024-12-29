<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import UserRound from 'lucide-svelte/icons/user-round';
</script>

<Avatar>
	<AvatarFallback>
		<UserRound size={16} stroke-width={2} class="opacity-60" aria-hidden="true" />
	</AvatarFallback>
</Avatar>
