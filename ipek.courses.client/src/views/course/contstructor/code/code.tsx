import './code.styl';

import React, { useEffect, useRef, useState } from 'react';

import CodeEditor from '@/common/ui/codeEditor/codeEditor';
import LargeButton from '@/common/ui/largeButton/largeButton';
import { langTool } from '@/store/utils';

import BoxQuill from '../model/quill/boxQuill';
import { type IConstructorCode, ILanguage } from '../model/types';
import { DragLine } from '../ui/dragLine/dragLine';

const testCode = `interface ILanguage{
	id: string,
	extensions: string,
	aliases: string,
	mimetypes: string,
}`;

const testLang = langTool.getLangs.find((l) => l.id === 'typescript') as ILanguage;
const ConstructorCode = ({ isReadonly, theory }: IConstructorCode): React.JSX.Element => {
	const boxConstructor = useRef<HTMLDivElement | null>(null);
	const boxTheory = useRef<HTMLDivElement | null>(null);
	const boxQuestions = useRef<HTMLDivElement | null>(null);
	const boxQuestion = useRef<HTMLDivElement | null>(null);
	const [maxHeightEditor, setMaxHeightEditor] = useState<number>(0);
	const calcMaxHeightEditor = (): void => {
		if (boxQuestions.current !== null && boxQuestion.current !== null) {
			const h = boxQuestions.current?.clientHeight - boxQuestion.current?.clientHeight - 16;
			setMaxHeightEditor(h);
		}
	};
	useEffect(() => {
		calcMaxHeightEditor();
	});
	return (
		<div className='constructor-code' ref={boxConstructor}>
			<div className='constructor-code__box-editor' ref={boxTheory}>
				<BoxQuill isReadonly={isReadonly} content={theory} />
			</div>
			<DragLine boxLeftRef={boxTheory} boxRightRef={boxQuestions} boxParentRef={boxConstructor} />
			<div className='constructor-code__questions' ref={boxQuestions}>
				<div className='constructor-code__question' ref={boxQuestion}>
					<div>
						<h3>Задача</h3>
						{isReadonly && <LargeButton value='Проверить' />}
					</div>
					<textarea placeholder={isReadonly ? '' : 'Напишите задачу'} readOnly={isReadonly} />
				</div>
				{isReadonly ? (
					<>
						<div className='constructor-code__compiler'>
							<h4>Вывод компилятора:</h4>
							<textarea readOnly />
						</div>
					</>
				) : (
					<CodeEditor code={testCode} maxHeight={70 + '%'} language={testLang} />
				)}
			</div>
		</div>
	);
};

export default ConstructorCode;
