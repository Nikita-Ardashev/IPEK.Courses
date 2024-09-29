import { Instance } from 'mobx-state-tree';

import { courseModel } from '@/store/models/store';

import { TCourse, TCourseTopic, TGroup, TUser } from '../types/types';
import { IApiCreateGroupWithUsers, IApiWithId } from './types';

// export interface ICourseTheme {
// 	id: string;
// 	isComplete: boolean;
// 	isWithError: boolean;
// 	isCompleteInDeadline: boolean;
// 	title: string;
// 	timer: string;
// }
// export interface ICourseCode extends ICourseTheme {
// 	theme: object;
// 	task: string;
// 	answer: string;
// }

// export interface ICourseTestTask {
// 	task: string;
// 	answer: string[];
// }
// export interface ICourseTest extends ICourseTheme {
// 	tasks: ICourseTestTask[];
// }

// export interface ICourse {
// 	id: string;
// 	name: string;
// 	category: string;
// 	icon: string;
// 	color: string;
// 	themes: ICourseCode[] | ICourseTest[];
// 	progress: number;
// 	assignedGroups: IGroup[] | IStudent[];
// }

// export interface IGroup {
// 	id: string;
// 	name: string;
// 	students: IStudent[];
// }

// export interface ILogin {
// 	login: string;
// 	password: string;
// }

// export interface IStudent {
// 	id: string;
// 	firstName: string;
// 	secondName: string;
// 	thridName: string;
// 	group: IGroup;
// 	phone: number;
// 	email: string;
// }

// export interface IProfile extends ILogin, IStudent {
// 	isTeacher: boolean;
// 	isAdmin: boolean;
// 	createdCourses?: ICourse[];
// 	assignedCourses?: ICourse[];
// 	completedCourses?: ICourse[];
// 	groups?: IGroup[];
// }

export const DEFAULT_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
};

export const apiGetUser = async ({ id }: IApiWithId) => {
	const res = await fetch('/api/Users/' + id, {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TUser>;
};

export const apiGetUsers = async ({ ids }: { ids: string[] }) => {
	const res = Promise.all(ids.map((id) => apiGetUser({ id })));
	return res;
};

export const apiCreateUser = async (body: TUser): Promise<string> => {
	const res = await fetch('/api/Users', {
		method: 'post',
		headers: { ...DEFAULT_HEADERS },
		body: JSON.stringify(body),
	});
	return res.json() as Promise<string>;
};

export const apiGetGroup = async ({ id }: IApiWithId) => {
	const res = await fetch('/api/StudentGroup/' + id, {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TGroup>;
};

export const apiGetGroups = async () => {
	const res = await fetch('/api/StudentGroup', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TGroup[]>;
};

export const apiCreateGroupWithStudents = async (body: IApiCreateGroupWithUsers) => {
	const res = await fetch('/api/StudentGroup/CreateGroupWithStudents', {
		method: 'post',
		headers: { ...DEFAULT_HEADERS },
		body: JSON.stringify(body),
	});
	return res.json() as Promise<TGroup>;
};

export const apiGetCourses = async () => {
	const res = await fetch('/api/Course', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TCourse[]>;
};

export const apiGetCourse = async (id: string) => {
	const res = await fetch('/api/Course/' + id, {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TCourse>;
};

export const apiCreateCourse = async (newCourse: TCourse) => {
	const res = await fetch('/api/Course', {
		method: 'post',
		headers: { ...DEFAULT_HEADERS },
		body: JSON.stringify(newCourse),
	});
	return res.json() as Promise<TCourse>;
};

export const apiGetCourseTopic = async (id: string) => {
	const res = await fetch('/api/CourseTopic/' + id, {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<TCourseTopic>;
};
