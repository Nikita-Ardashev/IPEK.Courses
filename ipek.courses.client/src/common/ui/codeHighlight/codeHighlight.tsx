import 'highlight.js/styles/default.css';
import './codeHighlight.styl';

import iconArrow from '@img/greyArrow.svg';
import iconSearch from '@img/search.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { getLanguages } from '@/common/utils/getLanguages';
import { type TLanguages } from '@/views/course/contstructor/model/types';

const languages = getLanguages() as TLanguages[];

interface ICodeHighlight {
	code: string;
	language: TLanguages;
	aloneLanguage?: boolean;
	editable?: boolean;
	useReturnContent?: (code: string, lang: string) => void;
}

const CodeHighlight = ({
	code,
	language,
	editable = false,
	useReturnContent,
	aloneLanguage = false,
}: ICodeHighlight): React.JSX.Element => {
	const [viewHljs, setViewHljs] = useState<boolean>(true);
	const [selectLang, setSelectLang] = useState<TLanguages>(language);
	const [languagesDropdown, setLanguagesDropdown] = useState<TLanguages[]>(languages);
	const [codeEdit, setCodeEdit] = useState<string>(code);
	const codeEditable = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		if (useReturnContent !== undefined) useReturnContent(e.currentTarget?.value ?? '', selectLang);
		setCodeEdit(e.currentTarget?.value ?? '');
	};
	const selectingLang = (e: React.MouseEvent<HTMLSpanElement>): void => {
		setSelectLang((e.currentTarget.textContent?.trim() as TLanguages) ?? languages[0]);
	};
	const searchLang = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const filterLangs = languages.filter((l) =>
			l.trim().toLowerCase().includes(e.currentTarget.value.trim().toLowerCase()),
		);
		setLanguagesDropdown(filterLangs);
	};
	const boxParentCodeRef = useRef<HTMLDivElement | null>(null);
	const [boxCode, setBoxCode] = useState<HTMLPreElement | null>(null);
	const [boxTextAreaCode, setBoxTextAreaCode] = useState<HTMLTextAreaElement | null>(null);
	useEffect(() => {
		const boxParentCode = boxParentCodeRef.current;
		if (boxParentCode === null) return;
		setBoxCode(boxParentCode.querySelector('pre'));
		setBoxTextAreaCode(boxParentCode.querySelector('textarea'));
	}, [boxCode, boxTextAreaCode]);

	const focusTextArea = (): void => {
		if (boxCode !== null && boxTextAreaCode !== null && viewHljs) {
			boxTextAreaCode.scrollTo(0, boxCode.scrollTop);
		}
		setViewHljs(false);
		boxTextAreaCode?.focus();
	};
	const blurTextArea = (): void => {
		if (boxCode !== null && boxTextAreaCode !== null && !viewHljs) {
			boxCode.scrollTo(0, boxTextAreaCode.scrollTop);
		}
		setViewHljs(true);
		boxTextAreaCode?.blur();
	};
	useHotkeys(
		'esc',
		(e) => {
			blurTextArea();
		},
		[viewHljs],
	);
	return (
		<div className='box-code-hljs'>
			{editable && (
				<div className='box-dropdown'>
					<div className='dropdown'>
						<button>
							<p>{selectLang}</p>
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
										<span key={l} onClick={selectingLang}>
											{l}
										</span>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}

			<div
				className='code-hljs'
				role='button'
				onClick={() => {
					editable && focusTextArea();
				}}
				ref={boxParentCodeRef}
			>
				{editable && (
					<textarea
						placeholder='Напишите ответ к задаче'
						autoCorrect='off'
						spellCheck={'false'}
						value={codeEdit}
						style={{ opacity: !viewHljs ? '1' : '0', pointerEvents: viewHljs ? 'none' : 'all' }}
						onChange={codeEditable}
						onBlur={blurTextArea}
					/>
				)}
				<SyntaxHighlighter
					customStyle={{
						cursor: 'text',
						opacity: viewHljs ? '1' : '0',
						pointerEvents: !viewHljs ? 'none' : 'all',
					}}
					language={selectLang}
					style={vs}
				>
					{codeEdit}
				</SyntaxHighlighter>
			</div>
		</div>
	);
};

export default CodeHighlight;
