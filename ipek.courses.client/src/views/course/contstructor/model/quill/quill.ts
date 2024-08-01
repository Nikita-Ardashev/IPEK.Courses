import 'quill/dist/quill.snow.css';

const toolbarOptions = [
	[{ color: [] }, { background: [] }],
	['bold', 'italic', 'underline', 'strike', 'clean'],
	['blockquote', 'code-block'],
	[{ script: 'sub' }, { script: 'super' }],
	[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
	[{ header: 1 }, { header: 2 }, { header: 3 }],
	['image', 'video'],
];

// interface IObjLangs {
// 	key: string;
// 	label: string;
// }

export const quillDefaultConfig = {
	theme: 'snow',
	modules: {
		// syntax: {
		// 	languages: objLangs,
		// },
		toolbar: toolbarOptions,
	},
	placeholder: 'Писать здесь',
};
