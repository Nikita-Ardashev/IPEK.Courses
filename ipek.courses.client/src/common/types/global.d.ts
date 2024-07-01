declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.gif';

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.png' {
	const value: any;
	export default value;
}

declare module '*.json' {
	const value: any;
	export default value;
}
