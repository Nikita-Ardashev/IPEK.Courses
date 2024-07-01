// export const responseStatusCheck = (
// 	api: () => Promise<Response>,
// 	t: (r: Response) => any,
// 	c: (e: string) => any,
// 	f?: () => any,
// ): void => {
// 	api()
// 		.then((r) => {
// 			t(r);
// 			return r;
// 		})
// 		.catch((e) => {
// 			c(e);
// 			console.error(e);
// 		})
// 		.finally(() => {
// 			f?.();
// 		});
// };

import { type Delta } from 'quill/core';

import { type IToken, type ITokenError } from './types';

const token = localStorage.getItem('token') ?? null;
console.log((typeof token === 'string') + ' => TOKEN');
const isAuth = { Authorization: 'Bearer' + token };
const toFormData = (obj: Record<any, any>): FormData => {
	const formData = new FormData();

	for (const key in obj) {
		formData.set(key, obj[key]);
	}
	return formData;
};

interface IAuth {
	login: string;
	password: string;
}

export const auth = async (data: IAuth): Promise<IToken | ITokenError> => {
	const api = await fetch('/api/login', {
		method: 'post',
		body: toFormData(data),
	});
	const r = await api.json();
	return r;
};

export const logout = async (): Promise<void> => {
	await fetch('/api/logout', {
		headers: { ...isAuth },
		method: 'get',
	})
		.then(() => {})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			localStorage.removeItem('token');
		});
};

export interface IUser {
	id: number;
	created_at: Date;
	updated_at: Date;
	login: string;
	name: string;
	surname: string;
	otchestvo: string;
	group: string;
	is_teacher: boolean;
	is_admin: boolean;
}

export const user = async (): Promise<IUser> => {
	const api = await fetch('/api/user', {
		method: 'get',
		headers: { ...isAuth },
	});
	const r = await api.json();
	return r;
};

interface IRegisterationUser {
	login: string;
	password: string;
	name: string;
	surname: string;
	otchestvo: string;
	group: string;
}

export const registerationUser = async (data: IRegisterationUser): Promise<void> => {
	await fetch('/api/registration/user', {
		headers: { 'Content-Type': 'form-data' },
		method: 'post',
		body: toFormData(data),
	});
};

export const registerationUsers = async (data: IRegisterationUser[]): Promise<void> => {
	await fetch('/api/registration/user', {
		headers: { 'Content-Type': 'form-data' },
		method: 'post',
		body: toFormData(data),
	});
};

export interface IRegisterationGroup {
	group: string;
	users: string[];
}

export const registerationGroup = async (props: IRegisterationGroup): Promise<void> => {
	await fetch('/api/registration', {
		headers: { 'Content-Type': 'application/json' },
		method: 'post',
		body: JSON.stringify(props),
	});
};

export interface IProfileDataUser {
	id: number;
	created_at: Date;
	updated_at: Date;
	login: string;
	name: string;
	surname: string;
	otchestvo: string;
	group: string;
	is_teacher: number;
	is_admin: number;
}

export interface IProfileDataCourse {
	user_id: number;
	course_id: number;
	status: number;
	progress: number;
	name: string;
	category: string;
	icon: string;
	background: string;
}

export const courses = async (): Promise<IProfileDataCourse[] | null> => {
	if (token === null) return null;
	const api = await fetch(`/api/courses`, {
		headers: { ...isAuth },
		method: 'get',
	});
	const r = await api.json();
	return r;
};

export interface ICourse {
	title: string;
	category: string;
	icon: File | null;
	background: string;
}

export const courseSave = async (props: ICourse): Promise<void> => {
	const api = await fetch('/api/course/create', {
		method: 'post',
		headers: { ...isAuth },
		body: toFormData(props),
	});
	const r = await api.json();
	return r;
};

interface IStudyCard {
	user_id: null;
	study_id: number;
	status: boolean;
	name: string;
}

export interface ICourseThemes {
	study_card: IStudyCard[];
	course: IProfileDataCourse;
}

export const courseThemes = async (courseId: number): Promise<ICourseThemes> => {
	const api = await fetch(`/api/course/themes/${courseId}`, {
		headers: { ...isAuth },
		method: 'get',
	});
	const r = await api.json();
	return r;
};

interface IConstructorTask<T> {
	taskName: string;
	information: Delta | null;
	task: T;
	taskTimer: string;
	courseId: number | null;
	language: string;
}

interface IConstructorTaskCode {
	question: string;
	answer: string;
}

export const constructorSaveCode = async (data: IConstructorTask<IConstructorTaskCode>): Promise<void> => {
	await fetch('/api/constructor/code/save', {
		headers: { ...isAuth, 'Content-Type': 'application/json' },
		method: 'post',
		body: JSON.stringify(data),
	});
};

export interface ICourseTask {
	study: {
		id: number;
		created_at: Date;
		updated_at: Date;
		name: string;
		content: Delta;
		time: string;
		language: string;
		course_id: number;
	};
	tasks: [
		{
			id: number;
			created_at: Date;
			updated_at: Date;
			question: string;
			answer: string;
			study_id: number;
		},
	];
	study_count: number;
}

export const courseTask = async (studieId: number | null): Promise<ICourseTask | null> => {
	if (studieId === null) return null;
	const api = await fetch(`/api/task/code/${studieId}`, {
		headers: { ...isAuth, 'Content-Type': 'application/json' },
		method: 'get',
	});
	const r = await api.json();
	return r;
};

export interface IGroupData {
	created_at: string;
	id: number;
	name: string;
	sort: number;
	updated_at: string;
}

export const groups = async (): Promise<IGroupData[]> => {
	const api = await fetch(`/api/group`, {
		headers: { ...isAuth },
		method: 'get',
	});
	const r = await api.json();
	return r;
};

export const group = async (id: string | null): Promise<IProfileDataUser[]> => {
	if (id === null) return [];
	const api = await fetch(`/api/group/${id}`, {
		method: 'get',
	});
	const r = await api.json();
	return r;
};

interface IAi {
	folder_id?: string;
	api_key?: string;
	model_version?: string;
	temperature?: number;
	max_tokens?: number;
	system_text: string;
	user_text: string;
}

interface IAiAnswer {
	result: {
		alternatives: [
			{
				message: {
					role: string;
					text: string;
				};
				status: string;
			},
		];
		usage: {
			inputTextTokens: number;
			completionTokens: number;
			totalTokens: number;
		};
		modelVersion: string;
	};
}

export const ai = async (data: IAi): Promise<IAiAnswer> => {
	const api = await fetch(`/api/ai`, {
		headers: { 'Content-Type': 'application/json', ...isAuth },
		method: 'post',
		body: JSON.stringify(data),
	});
	const r = await api.json();
	return r;
};
