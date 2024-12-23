<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	import { Pagination, PaginationContent, PaginationItem } from '$lib/components/ui/pagination';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	type PaginationProps = {
		currentPage: number;
		totalPages: number;
	};
	let { currentPage = 1, totalPages = 10 }: PaginationProps = $props();
</script>

<Pagination>
	<PaginationContent class="w-full justify-between gap-3">
		<PaginationItem>
			<Button
				variant="outline"
				class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
				aria-disabled={currentPage === 1 ? true : undefined}
				role={currentPage === 1 ? 'link' : undefined}
				href={currentPage === 1 ? undefined : `#/page/${currentPage - 1}`}
			>
				<ChevronLeft class="-ms-1 me-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
				Previous
			</Button>
		</PaginationItem>
		<PaginationItem>
			<Button
				variant="outline"
				class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
				aria-disabled={currentPage === totalPages ? true : undefined}
				role={currentPage === totalPages ? 'link' : undefined}
				href={currentPage === totalPages ? undefined : `#/page/${currentPage + 1}`}
			>
				Next
				<ChevronRight class="-me-1 ms-2 opacity-60" size={16} stroke-width={2} aria-hidden="true" />
			</Button>
		</PaginationItem>
	</PaginationContent>
</Pagination>
