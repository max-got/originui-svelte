/* eslint-disable perfectionist/sort-named-exports */
import Action from './alert-dialog-action.svelte';
import Cancel from './alert-dialog-cancel.svelte';
import Content from './alert-dialog-content.svelte';
import Description from './alert-dialog-description.svelte';
import Footer from './alert-dialog-footer.svelte';
import Header from './alert-dialog-header.svelte';
import Overlay from './alert-dialog-overlay.svelte';
import Title from './alert-dialog-title.svelte';

import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

const Root = AlertDialogPrimitive.Root;
const Trigger = AlertDialogPrimitive.Trigger;
const Portal = AlertDialogPrimitive.Portal;

export {
	Action,
	Action as AlertDialogAction,
	Cancel,
	Cancel as AlertDialogCancel,
	Content,
	Content as AlertDialogContent,
	Description,
	Description as AlertDialogDescription,
	Footer,
	Footer as AlertDialogFooter,
	Header,
	Header as AlertDialogHeader,
	Overlay,
	Overlay as AlertDialogOverlay,
	Portal,
	Portal as AlertDialogPortal,
	Root,
	Root as AlertDialogRoot,
	Title,
	Title as AlertDialogTitle,
	Trigger,
	Trigger as AlertDialogTrigger
};
