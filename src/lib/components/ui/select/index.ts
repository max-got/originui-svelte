import Content from './select-content.svelte';
import GroupHeading from './select-group-heading.svelte';
import Item from './select-item.svelte';
import ScrollDownButton from './select-scroll-down-button.svelte';
import ScrollUpButton from './select-scroll-up-button.svelte';
import Separator from './select-separator.svelte';
import Trigger from './select-trigger.svelte';

import { Select as SelectPrimitive } from 'bits-ui';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;

export {
	Content,
	Content as SelectContent,
	Group,
	Group as SelectGroup,
	GroupHeading,
	GroupHeading as SelectGroupHeading,
	Item,
	Item as SelectItem,
	Root,
	//
	Root as Select,
	ScrollDownButton,
	ScrollDownButton as SelectScrollDownButton,
	ScrollUpButton,
	ScrollUpButton as SelectScrollUpButton,
	Separator,
	Separator as SelectSeparator,
	Trigger,
	Trigger as SelectTrigger
};
