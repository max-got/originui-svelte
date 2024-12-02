/**
 * Makes complex types more readable in tooltips
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
