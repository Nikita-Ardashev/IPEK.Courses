import { languages } from 'monaco-editor';

import { storeModel } from './models/store';

export const store = storeModel.create({
	user: {
		id: '1',
		email: 'nikita.ardashev2521@gmail.com',
		firstName: 'Ардашев',
		secondName: 'Никита',
		thridName: 'Сергеевич',
		group: 'И-20-3',
		roleName: 'Admin',
		assignedCourses: [],
		completedCourses: [],
	},
	languages: { langs: languages.getLanguages() },
	courses: [],
	groups: [],
	fetchActionsModel: { courses: {}, groups: {}, user: {} },
});
