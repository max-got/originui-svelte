/**
 * Creates a union type of integers from Min to Max (inclusive)
 */
export type IntRange<Min extends number, Max extends number> =
	| Exclude<Enumerate<Max>, Enumerate<Min>>
	| Max;

/**
 * Helper type to generate union of integers up to N
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;
