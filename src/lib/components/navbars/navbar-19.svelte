<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import HistoryIcon from '@lucide/svelte/icons/history';
	import MessageSquareText from '@lucide/svelte/icons/message-square-text';
	import UserRoundPlus from '@lucide/svelte/icons/user-round-plus';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
</script>

<header class="border-b px-4 md:px-6">
	<div class="flex h-16 items-center justify-between gap-4">
		<!-- Left side -->
		<div class="flex items-center gap-2">
			<Button class="size-8" variant="ghost" size="icon" aria-label="Go back" href="#">
				<ChevronLeftIcon />
			</Button>
			<h1 class="text-sm font-medium">Basic UI</h1>
		</div>
		<!-- Right side -->
		<div class="flex items-center gap-2">
			<!-- History button -->
			<Button
				size="icon"
				variant="ghost"
				class="size-8 rounded-full text-muted-foreground shadow-none"
				aria-label="History"
			>
				<HistoryIcon size={16} aria-hidden="true" />
			</Button>
			<!-- Comments button -->
			<Button
				size="icon"
				variant="ghost"
				class="size-8 rounded-full text-muted-foreground shadow-none"
				aria-label="Save"
			>
				<MessageSquareText size={16} aria-hidden="true" />
			</Button>
			<!-- Add user -->
			<Button
				size="icon"
				variant="ghost"
				class="size-8 rounded-full text-muted-foreground shadow-none"
				aria-label="Add user"
			>
				<UserRoundPlus size={16} aria-hidden="true" />
			</Button>
			<!-- Online users -->
			<div class="ml-2 flex items-center gap-2">
				<div class="relative">
					<Avatar>
						<AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" />
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
					<span
						class="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-background bg-emerald-500"
					>
						<span class="sr-only">Online</span>
					</span>
				</div>
				<div class="relative">
					<Avatar>
						<AvatarImage src="./avatar-72-01.jpg" alt="Martha Johnson" />
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
					<span
						class="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-background bg-muted-foreground"
					>
						<span class="sr-only">Online</span>
					</span>
				</div>
				<div class="relative">
					<Avatar>
						<AvatarImage src="./avatar.jpg" alt="Linda Green" />
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
					<span
						class="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-background bg-muted-foreground"
					>
						<span class="sr-only">Online</span>
					</span>
				</div>
				<Button
					variant="secondary"
					class="flex size-8 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-background hover:bg-secondary hover:text-foreground"
					size="icon"
				>
					+3
				</Button>
			</div>
		</div>
	</div>
</header>
