import { Instance } from 'mobx-state-tree';
import { type Delta } from 'quill/core';

import { langModel } from '@/store/models/utils';

export interface ILanguage extends Instance<typeof langModel> {}

export type TConstructor = 'code' | 'theory' | 'test';
export interface IConstructorQuestions {
	quest: string;
	code: string;
	lang: ILanguage;
}

export interface IConstructorCode {
	theory?: Delta;
	question?: IConstructorQuestions;
	isReadonly: boolean;
}

export interface IConstructorTheory {
	isReadonly: boolean;
	content?: Delta;
}

export type TAnswers = [string, string, string, string];

export type TTrueAnswers = [number?, number?, number?, number?];

export interface IAnswer {
	id: number;
	title: string;
	answers: TAnswers;
	trueAnswer: TTrueAnswers | number | null;
}

export interface IConstructorTest {
	isReadonly: boolean;
	content?: IAnswer[];
}

export interface IConstructorData {
	code: IConstructorCode;
	theory: IConstructorTheory;
	test: IConstructorTest;
}

export interface IConstructorHeader {
	isReadonly: boolean;
	title?: string;
	time?: string;
}

export interface IConstructor {
	type: TConstructor;
}
