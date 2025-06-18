import DateField from './date-field.svelte';
import DateInput from './date-input.svelte';
import DateSegment from './date-segment.svelte';
import TimeField from './time-field.svelte';
import TimeInput from './time-input.svelte';
import TimeSegment from './time-segment.svelte';

const dateInputStyle =
	'text-foreground focus:bg-accent data-invalid:focused:bg-destructive focused:aria-[valuetext=Empty]:text-foreground focused:text-foreground data-invalid:aria-[valuetext=Empty]:text-destructive data-invalid:text-destructive aria-[valuetext=Empty]:text-muted-foreground/70 data-invalid:focused:text-white data-invalid:focused:aria-[valuetext=Empty]:text-white inline rounded p-0.5 caret-transparent outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[segment=literal]:text-muted-foreground/70 data-[segment=literal]:px-0';

export { DateField, DateInput, dateInputStyle, DateSegment, TimeField, TimeInput, TimeSegment };
