import { type Dispatch, type SetStateAction } from 'react';

export type IModalType = 'create' | 'edit' | 'warning' | 'task';

export type IModalEditType = 'student' | 'group' | 'course';

export type IModalTypeCreateTheme = 'theory' | 'test' | 'practice';

export interface IModalCreate {
	type: 'student' | 'group' | 'course';
	onCreate: () => void;
}

export interface IModalCreateCourseTheme {
	type: IModalTypeCreateTheme;
	onCreate: () => void;
}

export interface IModalWarning {
	text: string | React.ReactNode;
	onSuccess: () => void;
}

export interface IModalEdit {
	type: IModalEditType;
	onCreate: () => void;
}

export type TModalStudent =
	| 'firstName'
	| 'secondName'
	| 'thridName'
	| 'group'
	| 'login'
	| 'password';

export interface IModalStudentFields {
	firstName?: string;
	secondName?: string;
	thridName?: string;
	group?: string;
	login?: string;
	password?: string;
}

export interface IStudentInGroup {
	id: string | number;
	fullname: string;
}

export interface IModalEditGroups {
	groupName: string[] | string;
	students: IStudentInGroup[];
}

export interface IModalEditCourse {
	name: string;
	category: string;
	icon: string;
}

export interface IModalEditData {
	student: IModalStudentFields;
	groups: IModalEditGroups;
	course: IModalEditCourse;
}

export interface IModalData {
	create: IModalCreate;
	edit: IModalCreate;
	warning: IModalWarning;
	task: IModalCreateCourseTheme;
}

export interface IModalProps<T extends IModalType> {
	type: T;
	data: IModalData[T];
	setView: Dispatch<SetStateAction<boolean>>;
}
