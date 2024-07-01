import './test.styl';

import iconDelete from '@img/constructor/delete.svg';
import iconMultiAnswer from '@img/constructor/multi-answer.svg';
import iconSingleAnswer from '@img/constructor/single-answer.svg';
import React, { useMemo, useState } from 'react';

import { type IAnswer, type IConstructorTest, type TTrueAnswers } from '../model/types';
import TestAnswer from './ui/testAnswer';

export interface ICheckAnswer {
	inp: HTMLInputElement;
	answerIndex: number;
	questIndex: number;
}

export interface IRenameTitle {
	inp: HTMLTextAreaElement;
	questIndex: number;
}

export interface IRenameAnswer {
	inp: HTMLTextAreaElement;
	questIndex: number;
	answerIndex: number;
}

const questionSingle = JSON.stringify({ id: 0, title: '', answers: ['', '', '', ''], trueAnswer: null });
const questionMulti = JSON.stringify({ id: 0, title: '', answers: ['', '', '', ''], trueAnswer: [] });

const ConstructorTest = ({ isReadonly = false, content = [] }: IConstructorTest): React.JSX.Element => {
	const [questionList, setQuestionList] = useState<IAnswer[]>(content);

	const checkAnswer = ({ inp, answerIndex, questIndex }: ICheckAnswer): void => {
		const checked = inp.checked;
		setQuestionList((list) => {
			const newList = [...list];
			if (Array.isArray(newList[questIndex].trueAnswer)) {
				if (checked) {
					newList[questIndex].trueAnswer[answerIndex] = answerIndex;
				} else {
					newList[questIndex].trueAnswer = newList[questIndex].trueAnswer.filter(
						(index) => index !== answerIndex,
					) as TTrueAnswers;
				}
			} else {
				newList[questIndex].trueAnswer = checked ? answerIndex : null;
			}

			return newList;
		});
	};

	const newQuestion = (isMulti: boolean): void => {
		setQuestionList((list) => {
			if (isMulti) {
				const newQuestionMulti = JSON.parse(questionMulti);
				newQuestionMulti.id = list.length;
				return [...list, newQuestionMulti];
			} else {
				const newQuestionSingle = JSON.parse(questionSingle);
				newQuestionSingle.id = list.length;
				return [...list, newQuestionSingle];
			}
		});
	};

	const deleteQuestion = (index: number): void => {
		setQuestionList((list) => {
			const newList = list.filter((_, i) => i !== index);
			return newList;
		});
	};

	const renameTitle = ({ inp, questIndex }: IRenameTitle): void => {
		setQuestionList((list) => {
			const newList = [...list];
			newList[questIndex].title = inp.value.trim();
			return newList;
		});
	};

	const renameAnswer = ({ inp, answerIndex, questIndex }: IRenameAnswer): void => {
		setQuestionList((list) => {
			const newList = [...list];
			newList[questIndex].answers[answerIndex] = inp.value.trim();
			return newList;
		});
	};

	const questions = useMemo(() => {
		return questionList.map((q, qi) => (
			<div className='test-question' key={'question' + q.id}>
				<div className='test-question__title'>
					<h2>
						<textarea
							placeholder='Введите вопрос'
							rows={1}
							autoCorrect='on'
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
								renameTitle({ inp: e.currentTarget, questIndex: qi });
							}}
							value={q.title}
						/>
					</h2>
					<button
						type='button'
						onClick={() => {
							deleteQuestion(qi);
						}}
					>
						<img src={iconDelete} alt='' />
					</button>
				</div>
				<div className='test-question__answers'>
					{q.answers.map((a, i) => (
						<div className='test-question__answer' key={'question' + q.id + 'answer' + i}>
							<TestAnswer
								renameAnswer={renameAnswer}
								checkAnswer={checkAnswer}
								index={i}
								questIndex={qi}
								trueAnswer={q.trueAnswer}
							/>
						</div>
					))}
				</div>
			</div>
		));
	}, [questionList]);

	return (
		<div className='constructor-test'>
			<div className='constructor-test__control'>
				<button
					type='button'
					onClick={() => {
						newQuestion(false);
					}}
				>
					<img src={iconSingleAnswer} alt='' />
				</button>
				<button
					type='button'
					onClick={() => {
						newQuestion(true);
					}}
				>
					<img src={iconMultiAnswer} alt='' />
				</button>
			</div>
			<div className='constructor-test__questions'>{questions}</div>
		</div>
	);
};

export default ConstructorTest;
