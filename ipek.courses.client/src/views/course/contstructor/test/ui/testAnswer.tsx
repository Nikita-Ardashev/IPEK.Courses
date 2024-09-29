import { iconCheck } from '@assets/assets';
import React from 'react';

import { type ICheckAnswer, type IRenameAnswer, type TTrueAnswers } from '../test';

interface ITestAnswer {
	renameAnswer: (arg: IRenameAnswer) => void;
	checkAnswer: (arg: ICheckAnswer) => void;
	questIndex: number;
	index: number;
	trueAnswer: TTrueAnswers | number | null;
}

const TestAnswer = ({
	checkAnswer,
	renameAnswer,
	index,
	trueAnswer,
	questIndex,
}: ITestAnswer): React.JSX.Element => {
	const multi = Array.isArray(trueAnswer);
	const thisAnswer: React.ReactNode = multi ? <img src={iconCheck} /> : <span></span>;
	const multiIndex = multi && trueAnswer.find((a) => a === index);
	const checked: boolean = trueAnswer === index || multiIndex === index;
	return (
		<>
			<label className={multi ? '' : 'test-question__answer-multi'}>
				<input
					type='checkbox'
					hidden
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						checkAnswer({
							inp: e.currentTarget,
							questIndex,
							answerIndex: index,
						});
					}}
					checked={checked}
				/>
				{thisAnswer}
			</label>
			<textarea
				placeholder='Введите вариант ответа'
				rows={1}
				autoCorrect='on'
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					renameAnswer({ inp: e.currentTarget, answerIndex: index, questIndex });
				}}
			/>
		</>
	);
};

export default TestAnswer;
