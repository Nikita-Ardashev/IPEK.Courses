import hljs from 'highlight.js';

export const getLanguages = (): string[] => {
	const listLanguages: string[] = hljs.listLanguages().sort((a, b) => a.localeCompare(b));

	const plainIndex = listLanguages.findIndex((lang) => lang === 'plaintext');
	if (plainIndex !== -1) {
		const plain = listLanguages.splice(plainIndex, 1)[0];
		listLanguages.unshift(plain);
	}

	return listLanguages;
};
