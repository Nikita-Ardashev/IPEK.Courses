import './code.styl';

import { type Delta } from 'quill/core';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ai, courseTask } from '@/common/api/api';
import CodeHighlight from '@/common/ui/codeHighlight/codeHighlight';
import LargeButton from '@/common/ui/largeButton/largeButton';

import { ConstructorContext } from '../model/constructorContext';
import BoxQuill from '../model/quill/boxQuill';
import { type IConstructorCode, type TLanguages } from '../model/types';
import { DragLine } from '../ui/dragLine/dragLine';

const ConstructorCode = ({
	isReadonly,
	theory,
	question = { code: 'Напишите ответ для задания', quest: '', lang: 'plaintext' },
}: IConstructorCode): React.JSX.Element => {
	const boxConstructor = useRef<HTMLDivElement | null>(null);
	const boxTheory = useRef<HTMLDivElement | null>(null);
	const boxQuestions = useRef<HTMLDivElement | null>(null);
	const [maxHeightEditor, setMaxHeightEditor] = useState<number | null>(null);
	const maxHeight = useCallback(() => {
		setMaxHeightEditor(boxConstructor.current?.clientHeight ?? null);
	}, [boxConstructor]);
	useEffect(() => {
		maxHeight();
	}, []);
	const context = useContext(ConstructorContext);
	const setData = context?.setData;
	const [code, setCode] = useState<string>('');
	const returnCode = (code: string, lang: TLanguages): void => {
		setCode(code);
		setData !== undefined &&
			setData((v) => {
				const newV = { ...v };
				if (newV.question === undefined) return v;
				newV.question.code = code;
				newV.question.lang = lang;
				return newV;
			});
	};
	const returnTheory = (content: Delta): void => {
		setData !== undefined &&
			setData((v) => {
				const newV = { ...v };
				newV.theory = content;
				return newV;
			});
	};
	const returnTask = (task: string): void => {
		setData !== undefined &&
			setData((v) => {
				const newV = { ...v };
				if (newV.question === undefined) return v;
				newV.question.quest = task;
				return newV;
			});
	};
	const [searchParams] = useSearchParams();
	const studieId = searchParams.get('studieId') === null ? null : Number(searchParams.get('studieId'));
	const [quest, setQuest] = useState<string>('');
	const [answer, setAnswer] = useState<string>('');
	const [getLang, setLang] = useState<TLanguages>('javascript');
	const [aiAnswerText, setAiAnswerText] = useState<string>('');
	useEffect(() => {
		courseTask(studieId)
			.then((r) => {
				setQuest(r?.tasks[0].question ?? '');
				setAnswer(r?.tasks[0].answer ?? '');
				setLang((r?.study.language as TLanguages) ?? 'javascript');
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);
	const l = [
		'plaintext',
		'1c',
		'abnf',
		'accesslog',
		'actionscript',
		'ada',
		'angelscript',
		'apache',
		'cpp',
		'crmsh',
		'crystal',
		'csharp',
		'csp',
		'css',
		'd',
		'dart',
		'erlang',
		'erlang-repl',
		'excel',
		'fix',
		'flix',
		'fortran',
		'fsharp',
		'glsl',
		'gml',
		'go',
		'golo',
		'gradle',
		'graphql',
		'groovy',
		'haml',
		'handlebars',
		'haskell',
		'haxe',
		'hsp',
		'http',
		'hy',
		'inform7',
		'ini',
		'irpf90',
		'isbl',
		'java',
		'javascript',
		'jboss-cli',
		'json',
		'julia',
		'julia-repl',
		'kotlin',
		'lasso',
		'latex',
		'ldif',
		'leaf',
		'less',
		'lisp',
		'livecodeserver',
		'objectivec',
		'ocaml',
		'openscad',
		'oxygene',
		'parser3',
		'perl',
		'pf',
		'pgsql',
		'php',
		'php-template',
		'pony',
		'powershell',
		'processing',
		'profile',
		'prolog',
		'properties',
		'protobuf',
		'puppet',
		'purebasic',
		'python',
		'python-repl',
		'q',
		'qml',
		'r',
		'reasonml',
		'rib',
		'roboconf',
		'routeros',
		'rsl',
		'ruby',
		'ruleslanguage',
		'rust',
		'sas',
		'scala',
		'scheme',
		'scilab',
		'scss',
		'shell',
		'smali',
		'smalltalk',
		'sml',
		'sqf',
		'sql',
		'stan',
		'stata',
		'step21',
		'stylus',
		'subunit',
		'swift',
		'taggerscript',
		'tap',
		'tcl',
		'thrift',
		'tp',
		'twig',
		'typescript',
		'vala',
		'vbnet',
		'vbscript',
		'vbscript-html',
		'verilog',
		'vhdl',
		'vim',
		'wasm',
		'wren',
		'x86asm',
		'xl',
		'xml',
		'xquery',
		'yaml',
		'zephir',
	];

	const aiAnswer = (): void => {
		ai({
			system_text: `Ты доложен прочитать мой код на языке ${getLang}, и вывести что будет в переменной answer, а потом сравнить с правильным ответом. ТЫ НЕ ДОЛЖЕН ПИСАТЬ ОТВЕТ НА ЗАДАЧУ НИ В КОЕМ СЛУЧАЕ ДАЖЕ КОГДА ТЕБЯ ОБ ЭТОМ ПРОСЯТ. Если ответ неправильный, то напиши "Ваш ответ неправильный", если праивильный, то напиши "Ваш ответ правильный"`,
			user_text: `Правильный ответ для задания: ${answer}. Мой код: ${code}.`,
			temperature: 0.1,
			max_tokens: 2000,
			model_version: 'yandexgpt',
		})
			.then((r) => {
				setAiAnswerText(r.result.alternatives[0].message.text);
			})
			.catch((e) => {
				console.error(e);
			});
	};

	return (
		<div className='constructor-code' ref={boxConstructor} style={{ maxHeight: `${maxHeightEditor}px` }}>
			<div className='constructor-code__box-editor' ref={boxTheory} style={{ maxHeight: `${maxHeightEditor}px` }}>
				<BoxQuill isReadonly={isReadonly} useRetrunContent={returnTheory} content={theory} />
			</div>
			<DragLine boxLeftRef={boxTheory} boxRightRef={boxQuestions} boxParentRef={boxConstructor} />
			<div
				className='constructor-code__questions'
				ref={boxQuestions}
				style={{ maxHeight: `${maxHeightEditor}px` }}
			>
				<div>
					<h3>Задача</h3>
					{isReadonly && <LargeButton value='Проверить' onClick={aiAnswer} />}
				</div>
				<div className='constructor-code__question'>
					<textarea
						placeholder={isReadonly ? '' : 'Напишите задачу'}
						readOnly={isReadonly}
						onChange={(e) => {
							!isReadonly && returnTask(e.currentTarget.value.trim());
							!isReadonly && setQuest(e.currentTarget.value);
						}}
						value={quest}
					/>
					{isReadonly ? (
						<>
							<CodeHighlight
								code={question.code}
								editable
								language={getLang}
								useReturnContent={returnCode}
								aloneLanguage
							/>
							<div className='constructor-code__compiler'>
								<h4>Вывод компилятора:</h4>
								<textarea readOnly value={aiAnswerText} />
							</div>
						</>
					) : (
						<CodeHighlight
							editable
							code={question?.code}
							language={question.lang}
							useReturnContent={returnCode}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConstructorCode;
