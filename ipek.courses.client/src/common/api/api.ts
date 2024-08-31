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
	title: string;
	category: string;
	icon: string;
	color: string;
	themes: ICourseCode[] | ICourseTest[];
	progress: number;
	assignedGroups: IGroup[] | IStudent[];
}

export interface IGroup {
	id: string;
	title: string;
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

const DEFAULT_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
};

export const getUsers = async () => {
	const res = await fetch('http://localhost:5035/api/Users', {
		method: 'get',
		headers: { ...DEFAULT_HEADERS },
	});
	return res.json();
};
