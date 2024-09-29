import { languages } from 'monaco-editor';

import { storeModel } from './models/store';

export const store = storeModel.create({
	profile: {
		id: '1',
		email: 'nikita.ardashev2521@gmail.com',
		firstName: 'Ардашев',
		secondName: 'Никита',
		thirdName: 'Сергеевич',
		groupId: '0f8cdb6a-f704-450c-82c7-abf2ed43366f',
		roleName: 'Admin',
		phone: '',
		password: '',
	},
	languages: { langs: languages.getLanguages() },
	fetchActionsModel: {},
});
