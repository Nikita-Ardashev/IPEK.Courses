import './codeEditor.sass';

import { Editor, EditorProps } from '@monaco-editor/react';
import React, { useState } from 'react';

import { store } from '@/store/store';
import { ILanguage } from '@/views/course/contstructor/model/types';

import Dropdown from '../dropdown/dropdown';
import Preloader from '../preloader/preloader';
interface ICodeHighlight {
	code?: string;
	language?: ILanguage;
	aloneLanguage?: boolean;
	editable?: boolean;
	editorProps?: EditorProps;
	maxHeight?: string;
}

// const newTheme = editor.defineTheme('IPEK', {});

const langs = store.languages.getLangs;
const defaultLang = langs.find((l) => l.id === 'plaintext') as ILanguage;
const defaultEditorProps: EditorProps = {
	loading: <Preloader />,
	wrapperProps: { className: 'code' },
	className: 'code-fields',
};
const langNames = langs.map((l) => l.aliases[0]);

const CodeEditor = ({
	code,
	language = defaultLang,
	aloneLanguage,
	editable = true,
	editorProps = defaultEditorProps,
	maxHeight,
}: ICodeHighlight) => {
	const [lang, setLang] = useState<string>('');
	const langId = langs.find((l) => {
		const name = l.aliases[0] ?? '';
		return name.trim().toLowerCase() === lang.trim().toLowerCase();
	})?.id;

	return (
		<div className='box-code' style={{ maxHeight }}>
			{editable && (
				<div className='box-dropdown'>
					<Dropdown
						list={langNames}
						onlyCurrent={aloneLanguage}
						defaultCurrent={language.aliases[0]}
						setCurrent={setLang}
					/>
				</div>
			)}
			<div className='editor'>
				<Editor
					defaultLanguage={language.id ?? langs[0].id}
					language={langId}
					{...editorProps}
					value={code}
				/>
			</div>
		</div>
	);
};

export default CodeEditor;
