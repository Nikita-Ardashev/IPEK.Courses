interface ICourseTheme {
	id: string;
	isComplete: boolean;
	isWithError: boolean;
	isCompleteInDeadline: boolean;
	title: string;
	timer: string;
}
interface ICourseCode extends ICourseTheme {
	theme: object;
	task: string;
	answer: string;
}

interface ICourseTestTask {
	task: string;
	answer: string[];
}
interface ICourseTest extends ICourseTheme {
	tasks: ICourseTestTask[];
}

interface ICourse {
	id: string;
	title: string;
	themes: ICourseCode[] | ICourseTest[];
	progress: number;
	assignedGroups: IGroup[] | IStudent[];
}

interface IGroup {
	id: string;
	title: string;
	students: IStudent[];
}

interface ILogin {
	login: string;
	password: string;
}

interface IStudent {
	id: string;
	firstName: string;
	secondName: string;
	thridName: string;
	group: IGroup;
	phone: number;
}

interface IProfile extends ILogin, IStudent {
	isTeacher: boolean;
	isAdmin: boolean;
	createdCourses?: ICourse[];
	assignedCourses?: ICourse[];
	completedCourses?: ICourse[];
	groups?: IGroup[];
}
