import './codeEditor.styl';

import iconArrow from '@img/greyArrow.svg';
import iconSearch from '@img/search.svg';
import { Editor, EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';

import { langTool } from '@/store/utils';
import { ILanguage } from '@/views/course/contstructor/model/types';

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

const langs = langTool.getLangs;
const defaultLang = langs.find((l) => l.id === 'plaintext') as ILanguage;
const defaultEditorProps: EditorProps = {
	loading: <Preloader />,
	wrapperProps: { className: 'code' },
	className: 'code-fields',
};
const CodeEditor = ({
	code,
	language = defaultLang,
	aloneLanguage,
	editable = true,
	editorProps = defaultEditorProps,
	maxHeight,
}: ICodeHighlight) => {
	const [selectLang, setSelectLang] = useState<ILanguage>(language);
	const [languagesDropdown, setLanguagesDropdown] = useState<ILanguage[]>(langs);
	const selectingLang = (e: React.MouseEvent<HTMLSpanElement>): void => {
		const t = e.currentTarget;
		const newSelect = langs.find((l) => l.id === t.id);
		setSelectLang(newSelect ?? langs[0]);
	};
	const searchLang = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const filterLangs = langs.filter((l) => {
			if (l.aliases[0] === undefined || l.aliases[0] === null) return false;
			return l.aliases[0].trim().toLowerCase().includes(e.currentTarget.value.trim().toLowerCase());
		});
		setLanguagesDropdown(filterLangs);
	};

	return (
		<div className='box-code' style={{ maxHeight }}>
			{editable && (
				<div className='box-dropdown'>
					<div className='dropdown'>
						<button>
							<p>{selectLang.aliases[0]}</p>
							{!aloneLanguage && <img src={iconArrow} alt='' />}
						</button>
						{!aloneLanguage && (
							<div>
								<label>
									<input maxLength={20} type='text' placeholder='Поиск' onChange={searchLang} />
									<img src={iconSearch} alt='' />
								</label>
								{languagesDropdown.map((l) => {
									return (
										<span key={l.id} id={l.id} onClick={selectingLang}>
											{l.aliases[0]}
										</span>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
			<div className='editor'>
				<Editor
					defaultLanguage={language.id ?? langs[0].aliases[0]}
					language={selectLang.id}
					{...editorProps}
					value={code}
				/>
			</div>
		</div>
	);
};

export default CodeEditor;
