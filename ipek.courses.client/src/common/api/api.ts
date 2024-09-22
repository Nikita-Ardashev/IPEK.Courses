import { Instance } from 'mobx-state-tree';

import { userModel } from '@/store/models/store';

export interface ICourseTheme {
	id: string;
	isComplete: boolean;
	isWithError: boolean;
	isCompleteInDeadline: boolean;
	title: string;
	timer: string;
}
export interface ICourseCode extends ICourseTheme {
	theme: object;
	task: string;
	answer: string;
}

export interface ICourseTestTask {
	task: string;
	answer: string[];
}
export interface ICourseTest extends ICourseTheme {
	tasks: ICourseTestTask[];
}

export interface ICourse {
	id: string;
	name: string;
	category: string;
	icon: string;
	color: string;
	themes: ICourseCode[] | ICourseTest[];
	progress: number;
	assignedGroups: IGroup[] | IStudent[];
}

export interface IGroup {
	id: string;
	name: string;
	students: IStudent[];
}

export interface ILogin {
	login: string;
	password: string;
}

export interface IStudent {
	id: string;
	firstName: string;
	secondName: string;
	thridName: string;
	group: IGroup;
	phone: number;
	email: string;
}

export interface IProfile extends ILogin, IStudent {
	isTeacher: boolean;
	isAdmin: boolean;
	createdCourses?: ICourse[];
	assignedCourses?: ICourse[];
	completedCourses?: ICourse[];
	groups?: IGroup[];
}

export const DEFAULT_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
};

export const apiGetUsers = async () => {
	const res = await fetch('/api/Users', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as unknown as Instance<typeof userModel>;
};

export const apiGetGroups = async () => {
	const res = await fetch('/api/StudentGroup/dto', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json();
};

export const apiAddGroups = async () => {
	const res = await fetch('/api/StudentGroup', {
		method: 'post',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json();
};

export const apiGetCourses = async () => {
	const res = await fetch('/api/Course', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json() as Promise<ICourse[]>;
};

export const apiGetCoursesTopic = async () => {
	const res = await fetch('/api/CourseTopic', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json();
};
