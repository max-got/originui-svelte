<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
</script>

<div class="relative">
	<Avatar>
		<AvatarImage src="/avatar-80-07.jpg" alt="Kelly King" />
		<AvatarFallback>KK</AvatarFallback>
	</Avatar>
	<span
		class="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-background bg-emerald-500"
	>
		<span class="sr-only">Online</span>
	</span>
</div>
