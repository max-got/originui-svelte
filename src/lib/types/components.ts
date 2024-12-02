import type { PossibleDependency } from '$lib/constants';
import type { AvailableOUIComponent } from '$lib/utils/handleComponentSource';

import type { Prettify } from './helpers';

export interface DependenciesCode {
	highlighted: { content: string };
	raw: { content: string };
}

export interface ComponentDependencies {
	command: DependenciesCode;
	list: PossibleDependency[];
}

export interface SourceCode {
	highlighted: { content: string };
	highlightedWithDeps: { content: string };
	raw: { content: string };
	rawWithDeps: { content: string };
}

export interface BaseComponentMetadata {
	available: boolean;
	directory: AvailableOUIComponent;
	id: AvailableOUIComponent;
	path: string;
}

interface _UnavailableComponent extends BaseComponentMetadata {
	available: false;
}

interface _AvailableComponent extends BaseComponentMetadata {
	available: true;
	code: SourceCode;
	componentDependencies: ComponentDependencies;
}

export type UnavailableComponent = Prettify<_UnavailableComponent>;
export type AvailableComponent = Prettify<_AvailableComponent>;

export type ComponentMetadata = AvailableComponent | UnavailableComponent;

export interface ComponentDirectory {
	directory: AvailableOUIComponent;
	files: AvailableOUIComponent[];
}
