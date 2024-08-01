import { types } from 'mobx-state-tree';

import { studentModel } from './student';

export const groupModel = types.model({
	id: types.identifier,
	name: types.string,
	students: types.array(studentModel),
});
