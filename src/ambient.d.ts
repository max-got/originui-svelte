//https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/types.ts
interface Picture {
	img: {
		h: number;
		src: string;
		w: number;
	};
	/**
	 * Key is format. Value is srcset.
	 */
	sources: Record<string, string>;
}
declare module '*?enhanced' {
	const value: Picture;
	export default value;
}

declare module '*&enhanced' {
	const value: Picture;
	export default value;
}
