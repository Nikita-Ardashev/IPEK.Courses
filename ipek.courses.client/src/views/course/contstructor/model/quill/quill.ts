import 'quill/dist/quill.snow.css';

import hljs from 'highlight.js';

import { getLanguages } from '@/common/utils/getLanguages';

const toolbarOptions = [
	[{ color: [] }, { background: [] }],
	['bold', 'italic', 'underline', 'strike', 'clean'],
	['blockquote', 'code-block'],
	[{ script: 'sub' }, { script: 'super' }],
	[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
	[{ header: 1 }, { header: 2 }, { header: 3 }],
	['image', 'video'],
];

interface IObjLangs {
	key: string;
	label: string;
}

const objLangs: IObjLangs[] = [];
getLanguages().forEach((l) => {
	const o: IObjLangs = { key: l, label: l.charAt(0).toUpperCase() + l.slice(1) };
	objLangs.push(o);
});

export const quillDefaultConfig = {
	theme: 'snow',
	modules: {
		syntax: {
			hljs,
			languages: objLangs,
		},
		toolbar: toolbarOptions,
	},
	placeholder: 'Писать здесь',
};
